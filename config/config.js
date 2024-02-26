require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.MYSQL_DEV_USER,
    "password": process.env.MYSQL_DEV_PASSWORD,
    "database": process.env.MYSQL_DEV_DATABASE,
    "host": process.env.MYSQL_DEV_HOST,
    "port": process.env.MYSQL_DEV_PORT,
    "dialect": "mysql",
    "logging": false,
    "timezone": "+07:00"
  },
  "test": {
    "username": process.env.MYSQL_STAG_USER,
    "password": process.env.MYSQL_STAG_PASSWORD,
    "database": process.env.MYSQL_STAG_DATABASE,
    "host": process.env.MYSQL_STAG_HOST,
    "port": process.env.MYSQL_STAG_PORT,
    "dialect": "mysql",
    "logging": false,
    "timezone": "+07:00"
  },
  "production": {
    "username": process.env.MYSQL_PROD_USER,
    "password": process.env.MYSQL_PROD_PASSWORD,
    "database": process.env.MYSQL_PROD_DATABASE,
    "host": process.env.MYSQL_PROD_HOST,
    "port": process.env.MYSQL_PROD_PORT,
    "dialect": "mysql",
    "logging": false,
    "timezone": "+07:00"
  }
}
