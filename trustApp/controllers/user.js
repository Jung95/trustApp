const User = require("../models/user");
const Share = require("../models/share");
var dotenv = require('dotenv');

dotenv.config()

const userList = async (req, res, next) => {
    try {
        const list = await User.find().select('email nickname');
        res.status(201).json({
            list
        })


    } catch (err) {}
}
const shareList = async (req, res, next) => {
    try {
        const list = await Share.find({'last':true});
        res.status(201).json({
            list
        })


    } catch (err) {}
}
module.exports = {
    userList,
    shareList
}; // signUp 함수를 module 로 내보낸다.