const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('product', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        },
        exist: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        isOfert: {
            type: DataTypes.BOOLEAN
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        units: {
            type: DataTypes.STRING,
            allowNull: false
        },
        minunit: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stepunit: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    })
}