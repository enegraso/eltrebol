const { DataTypes } = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define("configs", {
    business: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slogan: {
      type: DataTypes.STRING,
    },
    messagewaenvio: {
      type: DataTypes.TEXT,
    },
    messagewaretira: {
      type: DataTypes.TEXT,
    },
    messagewareject: {
      type: DataTypes.TEXT,
    },
    horario: {
      type: DataTypes.TEXT,
    },
    deliveryprice: {
      type: DataTypes.INTEGER,
    },
  });
};
