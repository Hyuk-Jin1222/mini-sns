const jwt = require("jsonwebtoken");
const { Domain, User } = require("../models");

// POST /token
exports.createToken = async (req, res, next) => {
  const { clientSecret } = req.body;
  try {
    const domain = await Domain.findOne({
      where: { clientSecret },
      include: { model: User, attributes: ["id", "nick"] },
    });
    if (!domain) {
      return res
        .status(401)
        .json({ message: "등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요." });
    }
    const token = jwt.sign(
      { id: domain.User.id, nick: domain.User.nick },
      process.env.JWT_SECRET,
      { expiresIn: "30m", issuer: "mini-sns" },
    );
    return res.json({ message: "토큰이 발급되었습니다.", token });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
