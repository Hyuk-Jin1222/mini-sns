const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const passport = require("passport");
dotenv.config();
const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const passportConfig = require("./passport");

const { sequelize } = require("./models");

const app = express();
passportConfig(); // 패스포트 설정 (serialize/deserialize, local 전략 등록)

app.set("port", process.env.PORT || 8001);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use("/", express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  }),
);
app.use(passport.initialize());
// deserializeUser가 실행되기 전에 passport.session()이 실행되어야 함
app.use(passport.session());
app.use("/", pageRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
