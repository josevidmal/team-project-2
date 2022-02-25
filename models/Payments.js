const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Payments extends Model {}

Payments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            reference: {
                model: 'Users',
                key:'id',
            },
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        period_begind: {
            type: DataTypes.DATE,
            allowNull:false,
        },
        period_ends: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
sequelize,
timestamps: false,
underscored: true,
modelName: 'payments'
    },
);

module.exports = Payments;