const jwt = require("jsonwebtoken");
const cors = require("cors");
const Domain = require("../models/domain");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(403).json({ message: "로그인한 상태입니다." });
  }
};

// Authorization 헤더의 토큰을 검사하고, 내용을 res.locals.decoded에 저장
exports.verifyToken = (req, res, next) => {
  try {
    res.locals.decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET,
    );
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(419).json({ message: "토큰이 만료되었습니다." });
    }
    return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
  }
};

// 요청한 화면의 출처(Origin)가 등록된 도메인이면 CORS를 허락함
exports.corsWhenDomainMatches = async (req, res, next) => {
  const origin = req.get("origin");
  if (!origin) {
    return next(); // 서버끼리의 요청 등 Origin이 없으면 CORS 검사 대상이 아님
  }
  let host;
  try {
    host = new URL(origin).host;
  } catch {
    return next(); // "null" 같은 주소가 아닌 Origin은 허락하지 않음
  }
  try {
    const domain = await Domain.findOne({ where: { host } });
    if (domain) {
      return cors({ origin })(req, res, next);
    }
    return next(); // 허락 헤더 없이 응답 → 브라우저가 막음
  } catch (error) {
    return next(error);
  }
};
