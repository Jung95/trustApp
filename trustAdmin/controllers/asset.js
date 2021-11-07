const Request = require("../models/request");
const User = require("../models/user");
const Share = require("../models/share");
const Asset = require("../models/asset");
const jwt = require("jsonwebtoken"); // jsonwebtoken 라이브러리
var dotenv = require('dotenv');

dotenv.config()
const {
    TOKEN_KEY
} = process.env;

const deleteRequest = async (req, res, next) => {
    try {
        const {
            requestId,
            token
        } = req.body;
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const {
            _id
        } = decodedToken;
        const user = await User.findOne({
            _id
        });
        if(user['level']== '3'){
            await Request.deleteOne({
                "_id": requestId
            });
        }else{
            await Request.deleteOne({
                "_id": requestId,
                "email": user['email'],
                "progress": 0
            });
        }


        res.status(201).json({
            message: "1"
        });
    } catch (err) {}
}

const deposit = async (req, res, next) => {
    try {
        const type = "deposit";
        const {
            value,
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
        const newDeposit = new Request({
            value: value,
            date: date,
            email: user['email'],
            type: type
        });
        newDeposit.save();
        res.status(201).json({
            message: "1"
        });
    } catch (err) {}
}
const withdraw = async (req, res, next) => {
    try {
        const type = "withdraw";
        const {
            value,
            date,
            bank,
            account,
            token
        } = req.body;
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const {
            _id
        } = decodedToken;
        const user = await User.findOne({
            _id
        });
        const newWithdraw = new Request({
            value: value,
            date: date,
            bank: bank,
            account: account,
            email: user['email'],
            type: type
        });
        newWithdraw.save();
        res.status(201).json({
            message: "1"
        });
    } catch (err) {}
}
const progressDeposit = async (req, res, next) => {
    try {
        const type = "deposit";
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
        const list = await Request.find({
            "type": type,
            "email": user['email'],
            'progress': {
                $ne: 4
            }
        }).sort("-date");
        res.status(201).json({
            list
        })
    } catch (err) {}
}
const progressWithdraw = async (req, res, next) => {
    try {
        const type = "withdraw";
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
        const list = await Request.find({
            "type": type,
            "email": user['email'],
            'progress': {
                $ne: 4
            }
        }).sort("-date");
        res.status(201).json({
            list
        })
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
        const list = await Request.find({
            "email": user['email']
        }).sort("-date");
        res.status(201).json({
            list
        })
    } catch (err) {}
}

const usedAsset = async (req, res, next) => {
    try {
        const asset = await Asset.findOne({
            "isUsed": true
        }).sort("-date");
        res.status(201).json({
            asset
        })
    } catch (err) {}
}
const myAsset = async (req, res, next) => {
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
        const share = await Share.findOne({
            "last": true,
            "email": user['email']
        });
        res.status(201).json({
            share
        })
    } catch (err) {}
}


const assetList = async (req, res, next) => {
    try {
        const page = await parseInt(req.params.page);
        const limit = 30;
        if (page == 0) { //모든 데이터 일괄 
            const list = await Asset.find().where("isUsed").equals(true).sort("-date");
            res.status(201).json({
                list
            }); // list 생성되었다는 메세지를 응답으로 보낸다.
        } else {
            const list = await Asset.find().where("isUsed").equals(true).sort("-date").skip(((page - 1) * limit)).limit(limit);
            res.status(201).json({
                list
            }); // list 생성되었다는 메세지를 응답으로 보낸다.
        }

    } catch (err) {}
}

const historyList = async (req, res, next) => {
    try {
        let result = [];
        const page = await parseInt(req.params.page);
        const limit = 30;
        const {
            token,
        } = req.query;
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const {
            _id
        } = decodedToken;
        const user = await User.findOne({
            _id
        });
        const list = await Asset.find().where("isUsed").equals(true).sort("-date").skip(((page - 1) * limit)).limit(limit);
        for( let asset of list){
            let date = asset['date'];
            let share = await Share.findOne({"date":{$lte:date},"email":user['email']}).sort("-updated");
            let capital = share['share']*asset['asset'];
            result.push({"date":date,"capital":capital,"share":share})
        }
        res.status(201).json({
            result
        }); // list 생성되었다는 메세지를 응답으로 보낸다.


    } catch (err) {}
}
const chart = async (req, res, next) => {
    try {
        let dates = [];
        let capitals = [];
        const limit = 30;
        const {
            token,
        } = req.query;
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        const {
            _id
        } = decodedToken;
        const user = await User.findOne({
            _id
        });
        const list = await Asset.find().where("isUsed").equals(true).sort("-date").limit(limit);
        for( let asset of list){
            let date = asset['date'];
            let share = await Share.findOne({"date":{$lte:date},"email":user['email']}).sort("-updated");
            let capital = (share['share']*asset['asset']).toFixed(0);
            dates.push(date);
            capitals.push(capital);
        }
        res.status(201).json({
            dates,
            capitals
        }); // list 생성되었다는 메세지를 응답으로 보낸다.


    } catch (err) {}
}

module.exports = {
    deposit,
    withdraw,
    progressDeposit,
    progressWithdraw,
    requestList,
    usedAsset,
    myAsset,
    deleteRequest,
    assetList,
    historyList,
    chart
}; // signUp 함수를 module 로 내보낸다.