/**
 * 로그인 전략
 */

const passport = require("passport");
// 구조분해로 변수명 바꿈
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");

const { User } = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // front에서 보낸 req.body.email
        passwordField: "password" // req.body.password
      },
      async (email, password, done) => {
        // 로그인 전략
        try {
          // 1. 전달받은 email 값이 이미 DB에 있는지 찾아봄
          const user = await User.findOne({
            where: { email: email } // where: {email}
          });

          // 사용자가 존재하지 않는 경우
          if (!user) {
            // done(서버에러, 성공, 클라이언트 에러)
            return done(null, false, { reason: "존재하지 않는 이메일입니다." });
          }

          //2. 입력한 비밀번호와 DB의 비밀번호 비교
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            // 일치하는 경우 user 의 정보를 보냄
            return done(null, user);
          }

          return done(null, false, { reason: "비밀번호가 틀렸습니다." });
        } catch (error) {
          // 서버 에러인 경우
          console.error(error);
          return done(error);
        }
      }
    )
  );
};
