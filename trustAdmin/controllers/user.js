const User = require("../models/user");
const Share = require("../models/share");
const jwt = require("jsonwebtoken")
var dotenv = require('dotenv');

dotenv.config()
const {
    TOKEN_KEY
} = process.env;

const userDashboard = async (req, res, next) => {
    try {
        var list = [];
        const {
            token
        } = req.query;
        const decodedToken = jwt.verify(token, TOKEN_KEY);
        console.log(decodedToken);
        const {
            _id
        } = decodedToken;

        const user = await User.findOne({
            _id
        });
        if(!user){
            res.status(404).json({
                message: "permission"
            });
            return null;
        }
        const userList = await User.find();
        for (let user of userList) {
            let share = await Share.findOne({
                "email": user['email'],
                "last": true
            });
            if (share) {
                console.log(share);
                share['email'] = user['nickname'];
                if (user['shareOpen'] == false) {
                    share['share'] = null;
                }
                if (user['principalOpen'] == false) {
                    share['principal'] = null;
                }
                if (user['calculationOpen'] == false) {
                    share['calculation'] = null;
                }
                list.push(share);
            }

        }
        res.status(201).json({
            list
        })
    } catch (err) {}
}
const userList = async (req, res, next) => {
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
        if(!user){
            res.status(201).json({
                message: "permission"
            });
            return null;
        }
        const list = await User.find().select('email nickname name');
        res.status(201).json({
            list
        })
    } catch (err) {}
}
module.exports = {
    userList,
    userDashboard
}; // signUp 함수를 module 로 내보낸다.