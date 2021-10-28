const Asset = require("../models/asset");
const Transaction = require("../models/transaction");
const Share = require("../models/share");
const User = require("../models/user");
const Request = require("../models/request");
var dotenv = require('dotenv');

dotenv.config()

const deposit = async (req, res, next) => {
    try {
        const {
            value,
            email
        } = req.body;
        console.log(req.body)
        const newDeposit = new Request({
            value: value,
            email: email
        });
        newDeposit.save();
        res.status(201).json({
            message: "1"
        });
    } catch (err) {}
}
const withdraw = async (req, res, next) => {
    try {
        const {
            value,
            bank,
            account,
            email
        } = req.body;
        console.log(req.body)
        const newWithdraw = new Request({
            value: value,
            email: email,
            bank: bank,
            account: account
        });
        newWithdraw.save();
        res.status(201).json({
            message: "1"
        });
    } catch (err) {}
}