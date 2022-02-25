const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Insurances extends Model {}

Insurances.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        type:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        policy_number: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiration_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'insurances',
    }
);

module.exports = Insurances;