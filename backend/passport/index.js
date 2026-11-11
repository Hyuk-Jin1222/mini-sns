const passport = require("passport");
const local = require("./localStrategy");
const User = require("../models/user");

module.exports = () => {
  // req.login() 호출 시 실행
  passport.serializeUser((user, done) => {
    done(null, user.id); // 세션에 user.id만 저장
  });

  //{ id: 3, connect.sid: ...} -> req.user
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } });
      done(null, user); //req.user에 user정보 저장 req.isAuthenticated() === true
    } catch (error) {
      console.error(error);
      done(error);
    }
  });

  local();
};
