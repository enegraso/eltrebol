const { DataTypes } = require('sequelize');

module.exports = function (sequelize) {
    return sequelize.define('order', {
        client: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cellphone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        noteclient: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        delivery: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        sended: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        delivered: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        payd: {
            type: DataTypes.BOOLEAN,
            allownull: false
        },
        payd_idml: {
            type: DataTypes.STRING,
            allowNull: true
        },
        payd_mlstatus: {
            type: DataTypes.STRING,
            allowNull: true
        },
        merchant_order_idml: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ordercart: {
            type: DataTypes.STRING,
            allowNull: false
        },
        noteadmin: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    })
}