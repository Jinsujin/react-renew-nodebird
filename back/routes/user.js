const express = require("express");
const bcrypt = require("bcrypt");
const cors = require("cors");
const router = express.Router();
const passport = require("passport");

const { User, Post } = require("../models"); // 구조분해 할당으로 db.User 를 가져옴
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

/**
 * GET /user
 * 브라우저에서 새로고침 할때마다 유저정보를 불러온다
 */
router.get("/", async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        // 특정 컬럼의 데이터만 가져오기
        // attributes: ["id", "nickname", "email"],
        attributes: {
          exclude: ["password"] // 전체 데이터중 비밀번호 빼고 가져오기
        },
        include: [
          {
            // hasMany 이기때문에 model:Post 가 복수형이 되어 me.Posts 가 된다
            model: Post,
            attributes: ["id"]
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"]
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"]
          }
        ]
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

/**
 * 로그인
 * POST /user/login
 */
// authenticate(서버에러, 성공객체, 인포) -- done()으로 보낸 인자값들이 여기로 들어옴
router.post("/login", isNotLoggedIn, (req, res, next) => {
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
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        // 특정 컬럼의 데이터만 가져오기
        // attributes: ["id", "nickname", "email"],
        attributes: {
          exclude: ["password"] // 전체 데이터중 비밀번호 빼고 가져오기
        },
        include: [
          {
            // hasMany 이기때문에 model:Post 가 복수형이 되어 me.Posts 가 된다
            model: Post,
            attributes: ["id"]
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"]
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"]
          }
        ]
      });
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

/**
 * 회원가입 요청
 * POST /user/
 * req.body : {email, password, nickname}
 */
router.post("/", isNotLoggedIn, async (req, res, next) => {
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

/**
 * 로그아웃
 * 세션과 쿠키를 지움
 * 로그인 이후부터는, req.user에서 부터 사용자 정보를 얻을수 있다
 */
router.get("/logout", isLoggedIn, (req, res, next) => {
  req.logout();
  req.session.destroy(); // 세션의 쿠키, 아이디를 없앰
  res.send("ok");
});

module.exports = router;
