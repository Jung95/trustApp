var express = require("express"); // express 는 서버 개발을 위한 경량화된 프레임워크다.
var router = express.Router(); // express 프레임워크의 router 함수를 사용해서 위에서 말한 라우팅을 할 수 있다.
const {
    userList,
    shareList
} = require("../controllers/user"); // 위에서 작성한 auth.js 파일에서 signUp 모듈을 임포트 한다.

router.get("/", userList);
router.get("/share", shareList); 


module.exports = router; // 이 모듈을 내보냄.