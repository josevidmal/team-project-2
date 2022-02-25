const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Contacts extends Model {}

Contacts.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        mobile_phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        relationship: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'contacts',
    }
);

module.exports = Contacts;