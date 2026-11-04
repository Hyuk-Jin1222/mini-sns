const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// models 폴더의 모델 파일(index.js 제외)을 자동으로 불러와 초기화
const basename = path.basename(__filename);
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js",
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    db[model.name] = model;
    model.initiate(sequelize);
  });

// 모든 모델이 초기화된 뒤 관계 설정
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
