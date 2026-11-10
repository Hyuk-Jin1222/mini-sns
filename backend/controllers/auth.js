const bcrypt = require("bcrypt");
const User = require("../models/user");

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
