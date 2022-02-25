const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trips extends Model {}

Trips.init(
    {
        trip_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        trip_name:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        trip_hours: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trip_days: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trip_kms: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        toll_cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        fuel_cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        food_cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        hoyel_cost: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        difficulty_level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trip_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'trips',
    }
);

module.exports = Trips;