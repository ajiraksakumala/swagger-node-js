const Sequelize = require("sequelize");
const config = require("./config.js")[process.env.NODE_ENV];
module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
