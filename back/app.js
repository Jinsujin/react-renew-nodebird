const express = require("express");
const cors = require("cors");
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const app = express();
const passportConfig = require("./passport");

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

app.listen(3065, () => {
  console.log("서버 실행중");
});
