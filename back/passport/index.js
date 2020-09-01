const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  /**
   * 로그인
   */
  passport.serializeUser((user, done) => {
    // 쿠키 토큰값과 매칭되는 유저 id 저장
    // 세션저장소에 유저정보를 모두 다 저장하기는 무겁기때문에 id 만 저장
    done(null, user.id);
  });

  /**
   * 사용자의 정보를  user.id 를 사용해 User DB 에서부터 복구
   * 로그인 성공후, 그 다음 요청부터 여기로 들어온다 (라우터 실행전 매법 실행)
   */
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      // done(서버, 성공)
      done(null, user); // req.user
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
