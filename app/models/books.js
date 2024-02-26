const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const Books = sequelize.define('books', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    isbn: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    publisherId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'publishers',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'books',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "publisherId_foreign",
        using: "BTREE",
        fields: [
          { name: "publisherId" },
        ]
      },
    ]
  });

  Books.associate = function (models) {
    Books.hasOne(models.publishers, {
      foreignKey: 'id',
      sourceKey: 'publisherId',
    });
  };

  return Books;
};
