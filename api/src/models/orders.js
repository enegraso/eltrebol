const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('order', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    })
}