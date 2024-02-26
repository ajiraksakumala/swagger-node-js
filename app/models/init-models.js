var DataTypes = require("sequelize").DataTypes;
var _publishers = require("./publishers");

function initModels(sequelize) {
  var publishers = _publishers(sequelize, DataTypes);


  return {
    publishers,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
