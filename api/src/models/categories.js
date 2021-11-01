const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('category', {
        category: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        }
    })
}