var express = require("express"); // express 는 서버 개발을 위한 경량화된 프레임워크다.
const isAuth  = require("../middleware/isAuth");
const {
    deposit,
    withdraw,
    progressDeposit,
    progressWithdraw,
    requestList,
    usedAsset,
    myAsset,
    deleteRequest,
    assetList,
    historyList
} = require("../controllers/asset"); // 위에서 작성한 auth.js 파일에서 signUp 모듈을 임포트 한다.

var router = express.Router(); // express 프레임워크의 router 함수를 사용해서 위에서 말한 라우팅을 할 수 있다.


router.get('/deposit',isAuth, function (req, res, next) {
    res.render("asset/deposit", {
        title: '입금신청', name:req.user.name, level: req.user.level, page: "deposit"
    });
});

router.get('/withdraw',isAuth, function (req, res, next) {
    res.render("asset/withdraw", {
        title: '출금신청', name:req.user.name, level: req.user.level, page: "withdraw"
    });
});

router.get('/history',isAuth, function (req, res, next) {
    res.render("asset/history", {
        title: '자산변동내역', name:req.user.name, level: req.user.level, page: "history"
    });
});
router.get('/transaction',isAuth, function (req, res, next) {
    res.render("asset/transaction", {
        title: '입출금내역', name:req.user.name, level: req.user.level, page: "transaction"
    });
});

router.get('/history/:page', historyList);
router.post('/deposit',deposit);
router.post('/withdraw',withdraw);
router.delete('/request',deleteRequest);
router.get('/deposit/progress',progressDeposit);
router.get('/withdraw/progress',progressWithdraw);
router.get('/transaction/list',requestList);
router.get('/used',usedAsset);
router.get('/my',myAsset);
router.get('/list/:page',assetList);
module.exports = router; // 이 모듈을 내보냄.