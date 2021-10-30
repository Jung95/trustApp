const Asset = require("../models/asset");
const Transaction = require("../models/transaction");
const Share = require("../models/share");
const User = require("../models/user");
const Request = require("../models/request");
var dotenv = require('dotenv');
const jwt = require("jsonwebtoken"); // jsonwebtoken 라이브러리

dotenv.config()
const {
    TOKEN_KEY
} = process.env;

const transaction = async (req, res, next) => {
    try {
        const {
            value,
            base,
            email,
            date,
            token
        } = req.body;

        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const {
            _id
        } = decodedToken;
        const user = await User.findOne({
            _id
        });
        if (user['level'] !== '3') {
            res.status(201).json({
                message: "permission"
            });
            return null;
        }
        const newTransaction = new Transaction({
            value: value,
            base: base,
            email: email,
            date: date
        });
        newTransaction.save();
        const userList = await User.find().select("email");

        // 쉐어가 존재하지않을 떄 생성
        for (let user of userList) {
            let share = await Share.findOne({
                "last": true,
                "email": user['email']
            });
            if (!share) {
                let newShare = new Share({
                    email: user['email'],
                    date: date
                })
                await newShare.save();
            }
        }

        let userData = await Share.find({
            "last": true
        });

        userData.forEach(async function (data, index) {
            let calculation = parseFloat(data['calculation']);
            let principal = parseFloat(data['principal']);
            let share = parseFloat(data['share']);
            let fBase = parseFloat(base);
            let fValue = parseFloat(value);
            if (email == data['email']) { //transaction sender
                share = (share * fBase) / (fValue + fBase) + (value / (fValue + fBase));
                if (value > 0) { //deposit
                    principal = principal + fValue;
                    calculation = calculation + fValue;
                } else { //withdraw
                    principal = (1 + fValue / (fBase * share)) * principal;
                    calculation = (1 + fValue / (fBase * share)) * calculation;
                }
            } else { //not transaction sender
                share = (share * fBase) / (fValue + fBase);
            }

            let newShare = new Share({
                email: data['email'],
                calculation: calculation,
                principal: principal,
                share: share,
                date: date
            })
            await newShare.save();
            //이전 쉐어들 비활성화
            await Share.updateOne({
                "_id": data['_id']
            }, {
                $set: {
                    "last": false
                }
            })
        })

        res.status(201).json({
            message: "1"
        });
    } catch (err) {}
}

const assetUpdate = async (req, res, next) => { // signUp 하는 로직
    try {
        const {
            asset,
            date,
            token
        } = req.body; // POST 메소드로 들어온 요청의 데이터(body) 에서d date 을 destructuring 한다.
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const {
            _id
        } = decodedToken;
        const user = await User.findOne({
            _id
        });
        if (user['level'] !== '3') {
            res.status(201).json({
                message: "permission"
            });
            return null;
        }
        const lastAsset = await Asset.findOne({
            "date": date,
            "isUsed": true
        }); // updated date 의 정보를 가지고 Asset 콜렉션에서 조회한다.
        const newAsset = new Asset({
            asset: asset,
            date: date
        });
        if (lastAsset) {
            Asset.updateMany({
                "date": date
            }, {
                $set: {
                    "isUsed": false
                }
            }, function (err, product) {
                if (err) {
                    console.log(err);
                } else {
                    newAsset.save();
                }
            })
        } else {
            newAsset.save();
        }
        // 업데이트 발생


        res.status(201).json({
            message: "1"
        }); // Asset 생성되었다는 메세지를 응답으로 보낸다.
    } catch (err) {
        console.log(err);
        next(err); // 에러를 catch 해서 에러를 핸들링 하는 미들웨어에서 처리하도록 한다.
    }
};


const clientShare = async (req, res, next) => {
    try {
        const {
            token
        } = req.query;

        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const {
            _id
        } = decodedToken;
        const user = await User.findOne({
            _id
        });
        if (user['level'] !== '3') {
            res.status(201).json({
                message: "permission"
            });
            return null;
        } else {
            const list = await Share.find().where("last").equals(true).sort("-share");
            res.status(201).json({
                list
            }); // list 생성되었다는 메세지를 응답으로 보낸다.
        }

    } catch (err) {}
}


const requestList = async (req, res, next) => {
    try {
        const {
            token
        } = req.query;
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const {
            _id
        } = decodedToken;
        const user = await User.findOne({
            _id
        });
        if (user['level'] !== '3') {
            console.log('hi1')
            res.status(201).json({
                message: "permission"
            });
            return null;
        } else {
            console.log('hi2')
            const list = await Request.find({}).sort("-date");
            res.status(201).json({
                list
            })
        }
    } catch (err) {}
}


module.exports = {
    assetUpdate,
    transaction,
    clientShare,
    requestList
}; // signUp 함수를 module 로 내보낸다.