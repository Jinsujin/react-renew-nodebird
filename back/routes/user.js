const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { User } = require("../models"); // 구조분해 할당으로 db.User 를 가져옴
const router = express.Router();
const passport = require("passport");

/**
 * 로그인
 * POST /user/login
 */
// authenticate(서버에러, 성공객체, 인포) -- done()으로 보낸 인자값들이 여기로 들어옴
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      // 클라이언트 에러
      return res.status(401).send(info.reason);
    }
    // passport 로그인
    return req.login(user, async loginErr => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      // 로그인 성공시, 사용자 정보를 프론트로 넘겨줌
      return res.json(user);
    });
  })(req, res, next);
});

/**
 * 회원가입 요청
 * POST /user/
 * req.body : {email, password, nickname}
 */
router.post("/", async (req, res, next) => {
  try {
    // 1.DB 에서 요청에서 온 email 이 이미 있는지 검사
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (exUser) {
      // 값이 있다면, 응답을 한번 보내고 요청 종료시킴
      return res.status(403).send("이미 사용중인 아이디 입니다");
    }
    // 암호화한 비밀번호 -
    // 높을 수록 보안이 세짐. 값이 높으면 해석 시간이 오래걸림.보통 10~13
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      // User table 에 데이터를 넣음
      email: req.body.nickname,
      nickname: req.body.nickname,
      password: hashedPassword
    });
  } catch (error) {
    console.log(error);
    next(error); // status 500
  }
  res.status(200).send("ok");
});

module.exports = router;
