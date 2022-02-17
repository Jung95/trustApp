var express = require("express"); // express 는 서버 개발을 위한 경량화된 프레임워크다.
var dotenv = require('dotenv');
dotenv.config()
const {
    npm_config_db
} = process.env;
var router = express.Router(); // express 프레임워크의 router 함수를 사용해서 위에서 말한 라우팅을 할 수 있다.
const {
    signUp,
    signIn
} = require("../controllers/auth"); // 위에서 작성한 auth.js 파일에서 signUp 모듈을 임포트 한다.

router.post("/signup", signUp); // signup 이라는 미들웨어를 signup 의 주소와 연결 시켜준다. 즉 front-end 클라이언트서버는 홈페이지주소/auth/signup 으로 회원가입 요청을 보낼 수 있게 된다.
router.post("/signin", signIn);
// 로그인 GET
router.get('/signin', function (req, res, next) {
    res.render("auth/signin", {
        title: '로그인',
        db: npm_config_db
    });
});
// signUP GET
router.get('/signup', function (req, res, next) {
    res.render("auth/signup", {
        title: '회원가입'
    });
});

// signOut GET
router.get('/signout', function (req, res, next) {
    res.render("auth/signin", {
        title: '로그아웃',
        db: npm_config_db
    });
});
module.exports = router; // 이 모듈을 내보냄.