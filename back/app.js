const express = require("express");
const postRouter = require("./routes/post");
const db = require("./models");
const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

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

app.listen(3065, () => {
  console.log("서버 실행중");
});
