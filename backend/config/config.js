require("dotenv").config();

const base = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "127.0.0.1",
  dialect: "mysql",
};

module.exports = {
  development: {
    ...base,
    database: process.env.DB_NAME_DEV || "mini_sns_dev",
  },
  test: {
    ...base,
    database: process.env.DB_NAME_TEST || "mini_sns_test",
  },
  production: {
    ...base,
    database: process.env.DB_NAME_PROD || "mini_sns_prod",
  },
};
