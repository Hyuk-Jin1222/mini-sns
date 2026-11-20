const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/user");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email", // req.body.email
        passwordField: "password", // req.body.password
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          if (!user) {
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
          }
          if (!user.password) {
            // 카카오로 가입한 계정은 비밀번호가 없음
            return done(null, false, { reason: "카카오로 가입한 계정입니다. 카카오 로그인을 이용하세요." });
          }
          const result = await bcrypt.compare(password, user.password);
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: "비밀번호가 틀립니다." });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
