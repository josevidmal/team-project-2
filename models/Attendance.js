const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Attendance extends Model {}

Attendance.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            reference:{
                model: 'Users',
                key: 'id',
            },
        },
        trip_id:{
            type: DataTypes.INTEGER,
            allowNull:true,
            reference: {
                model:'Trips',
                key:'trip_id',
            },
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull:true,
            reference: {
                model:'Events',
                key:'event_id',
            }
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'attendance',
    }
);

module.exports = Attendance;