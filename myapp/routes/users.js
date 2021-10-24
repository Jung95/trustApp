var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 로그인 GET
router.get('/login', function(req, res, next) {
  res.render("user/login");
});
// 로그인 Post
router.post("/login", async function(req,res,next){
  let body = req.body;

  let result = await models.user.findOne({
      where: {
          email : body.userEmail
      }
  });

  let dbPassword = result.dataValues.password;
  let inputPassword = body.password;
  let salt = result.dataValues.salt;
  let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");

  if(dbPassword === hashPassword){
      console.log("비밀번호 일치");
      res.redirect("/user");
  }
  else{
      console.log("비밀번호 불일치");
      res.redirect("/user/login");
  }
});

module.exports = router;
