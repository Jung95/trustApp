const User = require("../models/user"); // 위에서 설계한 User 정보를 담기위한 document 모델
const bcrypt = require("bcryptjs"); // 유저가 입력한 password 를 암호화 하기 위한 알고리즘 라이브러리
const jwt = require("jsonwebtoken")
var dotenv = require('dotenv');

dotenv.config()

const { TOKEN_KEY } = process.env;
const createUserData = async (userInput) => { // user를 객체화하고 Database에 저장하는 함수
    const user = await userWithEncodePassword(userInput); // input 을 인자로 넘겨주고, 암호화된 정보가 담긴 객체를 결과로 받는다. 
    return user.save(); // mongoose 의 save() 메소드를 통해서 Users 콜렉션에 도큐먼트(객체) 저장하기
};

const userWithEncodePassword = async ({ // destructuring
    email,
    password,
    name,
    nickname,
    level
}) => {

    const hashedPassword = await bcrypt.hash(password, 12); // 비밀번호를 암호화 하는 함수

    const user = new User({ // User 스키마를 사용해서 도큐먼트(객체)를 생성한다.
        email,
        password: hashedPassword,
        name,
        nickname,
        level
    });
    return user;
};

const errorGenerator = (message, statusCode) => { // error 를 핸들링 하는 함수
    const error = new Error(message); // error 객체를 생성
    error.statusCode = statusCode;
    throw error; // error 를 핸들링 하는 하는 미들웨어로 에러를 던진다.
};

const signUp = async (req, res, next) => { // signUp 하는 로직
    try {
        const {
            email
        } = req.body; // POST 메소드로 들어온 요청의 데이터(body) 에서 email 을 destructuring 한다.
        const user = await User.findOne({
            email
        }); // email 의 정보를 가지고 Users 콜렉션에서 조회한다.
        if (user){
            res.status(201).json({
                error: "0"
            });
            return;
        } // 중복 될 시에 에러 발생시킴

        await createUserData(req.body); // 위에서 정의한 함수로 POST메소드로 들어온 데이터(body)를 보낸다.
        res.status(201).json({
            message: "User created"
        }); // user가 생성되었다는 메세지를 응답으로 보낸다.
    } catch (err) {
        next(err); // 에러를 catch 해서 에러를 핸들링 하는 미들웨어에서 처리하도록 한다.
    }
};

const createToken = (userId) => {
    const token = jwt.sign({
        _id: userId.toString()
    }, TOKEN_KEY); // 인자로 넘겨받은 user 도큐먼트(객체)의 고유 id로 토큰을 만든다. 두번째 인자값은 salt 값으로 보안과 관련된 값이므로, 보통 dotenv 로 환경변수에 넣어서 사용하게 된다.
    return token;
};

const signIn = async (req, res, next) => {
    try {
        
        const {
            email = null, password = null
        } = req.body; // POST 메소드로 들어온 요청의 데이터(body)에서 email, password 를 destructuring 한다.
        if (!email || !password){
            res.status(201).json({
                error: "0"
            });
            return;
        } // input 으로 들어오지 않은 경우에 잘못된 인풋이라는 에러를 던진다.

        const user = await User.findOne({
            email
        }); // email 로 조회한다.
        if (!user){
            res.status(201).json({
                error: "1"
            });
            return;
        } // user 가 없을 경우에 error 를 발생시킨다.

        const passwordCheck = await bcrypt.compare(password, user.password); // bcrypt compare 함수로 입력된 비밀번호와 암호화되어서 저장된 비밀번호를 비교한다.

        if (!passwordCheck){
            res.status(201).json({
                error: "2"
            });
            return;
        }  // 암호가 같지 않을 경우에 잘못된 패스워드라는 메시지로 에러를 던진다.
        if (user.level == 0){
            res.status(201).json({
                error: "3"
            });
            return;
        }  // 미승인된 계정이라는 메시지로 에러를 던진다.

        const token = createToken(user._id); // user 도큐먼트(객체)의 고유한 id로 토큰을 만든다.

        res.status(201).json({
            message: "auth",
            token
        }); // token 을 response로 넘겨준다.
    } catch (err) {
        next(err);
    }
};

module.exports = {
    signUp,
    signIn
}; // signUp 함수를 module 로 내보낸다.