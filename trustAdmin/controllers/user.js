const User = require("../models/user");
const Share = require("../models/share");
var dotenv = require('dotenv');

dotenv.config()


const userDashboard = async (req, res, next) => {
    try {
        var list=[];
        const userList = await User.find();
        for( let user of userList){
            let share = await Share.findOne({"email":user['email'],"last":true});
            share['email'] = user['nickname'];
            if(user['shareOpen']==false){
                share['share']=null;
            }if(user['principalOpen']==false){
                share['principal']=null;
            }if(user['calculationOpen']==false){
                share['calculation']=null;
            }
            list.push(share);
        }
        res.status(201).json({
            list
        })
    } catch (err) {}
}
const userList = async (req, res, next) => {
    try {
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