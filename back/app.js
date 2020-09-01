const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const passport = require("passport");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();

/**
 * user: express 서버에 기능(미들웨어)을 장착.
 * front 에서 보낸 데이터를 req.body 에 넣어준다
 */
app.use(
  cors({
    origin: true, // * 모든 주소에서의 요청 허용. TODO: 서비스 도메인으로 변경할것
    credentials: false
  })
);
app.use(express.json()); // json 형식
app.use(express.urlencoded({ extended: true })); // form submit 했을때
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET // 해시코드를 만들기위한 키. 해킹되지 않도록 따로 관리해야 함
  })
);
app.use(passport.initialize());
app.use(passport.session());

/**
 * request: 요청
 * response: 응답
 */
app.get("/", (req, res) => {
  res.send("hello express");
});

app.get("/api", (req, res) => {
  res.send("api");
});

// postRouter 에서 중복되는 주소를 프리픽스로 정의
app.use("/post", postRouter);
app.use("/user", userRouter);

// 에러처리 미들웨어
// app.use((err, req, res, next) => {});

app.listen(3065, () => {
  console.log("서버 실행중");
});
