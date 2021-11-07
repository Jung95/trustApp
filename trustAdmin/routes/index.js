var express = require('express');
const User = require("../models/user"); // 위에서 설계한 User 정보를 담기위한 document 모델
const isAuth = require("../middleware/isAuth");
const {
  npm_config_db
} = process.env;
var router = express.Router();
/* GET home page. */
router.get('/', isAuth, function (req, res, next) {
  res.render('index', {
    title: '종호신탁',
    name: req.user.name,
    level: req.user.level,
    page: "index",
    db: npm_config_db
  });
});
module.exports = router;