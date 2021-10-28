var express = require("express"); // express 는 서버 개발을 위한 경량화된 프레임워크다.
const isAuth  = require("../middleware/isAuth");
var router = express.Router(); // express 프레임워크의 router 함수를 사용해서 위에서 말한 라우팅을 할 수 있다.


router.get('/deposit',isAuth, function (req, res, next) {
    res.render("asset/deposit", {
        title: '추가투자', name:req.user.name, level: req.user.level, page: "deposit"
    });
});

router.get('/withdraw',isAuth, function (req, res, next) {
    res.render("asset/withdraw", {
        title: '출금신청', name:req.user.name, level: req.user.level, page: "withdraw"
    });
});

router.get('/histroy',isAuth, function (req, res, next) {
    res.render("asset/histroy", {
        title: '입출금내역', name:req.user.name, level: req.user.level, page: "history"
    });
});
router.get('/transaction',isAuth, function (req, res, next) {
    res.render("asset/transaction", {
        title: '자산변동내역', name:req.user.name, level: req.user.level, page: "transaction"
    });
});

module.exports = router; // 이 모듈을 내보냄.