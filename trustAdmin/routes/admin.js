var express = require("express"); // express 는 서버 개발을 위한 경량화된 프레임워크다.
const isAuth  = require("../middleware/isAuth");
var router = express.Router(); // express 프레임워크의 router 함수를 사용해서 위에서 말한 라우팅을 할 수 있다.
const {
    assetUpdate,
    transaction,
    clientShare,
    requestList,
    feeCollection
} = require("../controllers/admin"); // 위에서 작성한 auth.js 파일에서 signUp 모듈을 임포트 한다.

// 로그인 GET
router.get('/asset',isAuth, function (req, res, next) {
    res.render("admin/asset", {
        title: '자산기입', name:req.user.name, level: req.user.level, page: "asset"
    });
});
router.get('/share',isAuth, function (req, res, next) {
    res.render("admin/share", {
        title: '지분관리', name:req.user.name, level: req.user.level, page: "share"
    });
});
router.get('/client',isAuth, function (req, res, next) {
    res.render("admin/client", {
        title: '회원관리', name:req.user.name, level: req.user.level, page: "client"
    });
});
router.get('/request',isAuth, function (req, res, next) {
    res.render("admin/request", {
        title: '요청관리', name:req.user.name, level: req.user.level, page: "request"
    });
});
router.get('/request/list', requestList);
router.get('/share/client', clientShare);
router.post('/asset', assetUpdate);
router.post('/transaction', transaction);
router.post('/fee', feeCollection);
module.exports = router; // 이 모듈을 내보냄.