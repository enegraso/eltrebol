const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('product', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        Exist: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        categoryid: {
            type: DataTypes.INTEGER,
        },
        isOfert: {
            type: DataTypes.BOOLEAN
        }
    })
}