const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("orderline", {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
