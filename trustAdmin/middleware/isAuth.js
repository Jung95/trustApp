const jwt = require("jsonwebtoken"); // jsonwebtoken 라이브러리
const User = require("../models/user"); // mongoose user model schema
var dotenv = require('dotenv');

dotenv.config()
const {
  PASSWORD_KEY
} = process.env;

const errorGenerator = (message, statusCode = 500) => { // error 를 핸들링 하는 함수
  const error = new Error(message); // error 객체를 생성
  error.statusCode = statusCode;
  throw error; // error 를 핸들링 하는 하는 미들웨어로 에러를 던진다.
};

module.exports = async (req, res, next) => { // 바로
  try {
    if (req.cookies['user']) {
      const token = req.cookies['user']; // req(요청) 객체의 헤더의 값을 가지고 올 때에는 get 메소드를 사용하고 인자로 Key 값을 넘겨준다. 
      const decodedToken = jwt.verify(token, PASSWORD_KEY); // 요청의 헤더에 담겨온 토큰을 만들 때 뿌려준 salt 값으로 복호화 한다.
      const {
        _id
      } = decodedToken; // 복호화된 토큰 객체에서 id 를 꺼낸다. (토큰을 만들 때 넣어준 id 가 들어있다.)

      const user = await User.findOne({
        _id
      }); // user 조회
      if (!user) errorGenerator("Not found User", "404"); // 없으면 404 에러를 내보낸다.
      if (user.level < 1) {
        res.write("<script>alert(\"Your registration has not been approved yet\")</script>");
        res.write("<script>window.location=\"../auth/signin\"</script>");
      } else {
        req.user = user; // request 객체의 user 에 담아서 다른 기능을 하는 함수로 넘겨준다.
        next(); // next() 함수로 미들웨어를 연결 시켜야 요청의 맥락이 연결된다. 이 함수가 없으면 이 미들웨어에서 요청이 끊겨 버림.  
      }
    }else{
      req.isntAuth = true;
      res.render("auth/signin", {
        title: '로그인'
    });
      //res.write("<script>window.location=\"../auth/signin\"</script>");
    }
  } catch (err) {
    req.isntAuth = true;
    res.render("auth/signin", {
      title: '로그인'
  });
    //res.write("<script>window.location=\"../auth/signin\"</script>");
  }
};