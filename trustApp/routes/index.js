var express = require('express');
const User = require("../models/user"); // 위에서 설계한 User 정보를 담기위한 document 모델
const isAuth  = require("../middleware/isAuth");

var authRoutes = require("./auth"); // 위에서 작성한 /routes/auth.js 모듈을 임포트 한다. 즉, router 를 임포트 하는 것
var router = express.Router();
/* GET home page. */
router.get('/', isAuth, function(req, res, next) {
  res.render('index', { title: '종호신탁', name: req.user.name, level: req.user.level, page : "index"});
  console.log(req.user);
});

  /*
  let test = new User();
  test.email = 'jj';
  test.password = 'ja';
  test.name = 'jj1';
  test.save();
  */
module.exports = router;
