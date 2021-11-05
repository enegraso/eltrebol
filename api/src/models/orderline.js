const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("orderline", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ordercart: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
};
