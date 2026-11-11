const bcrypt = require("bcrypt");
const User = require("../models/user");
const passport = require("passport");

// POST /auth/join
exports.join = async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(409).json({ message: "이미 가입된 이메일입니다." });
    }
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      nick,
      password: hash,
    });
    return res
      .status(201)
      .json({ id: user.id, email: user.email, nick: user.nick });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
exports.login = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(401).json({ message: info.reason });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.json({ id: user.id, email: user.email, nick: user.nick });
    });
  })(req, res, next);
};
exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "로그아웃 중 오류가 발생했습니다." });
    }
    req.session.destroy((sessionError) => {
      if (sessionError) {
        console.error(sessionError);
        return res
          .status(500)
          .json({ message: "세션 종료 중 오류가 발생했습니다." });
      }
      res.clearCookie("connect.sid"); // 세션 쿠키 삭제
      return res.json({ message: "로그아웃 성공" });
    });
  });
};
