const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Appointments extends Model {}

Appointments.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        trip_id:{
            type: DataTypes.INTEGER,
            allowNull:true,
            reference: {
                model:'Trips',
                key:'trip_id',
            },
        },
        location: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        meet_hour: {
            type: DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW,
        },
        departure_hour: {
            type: DataTypes.DATE,
            allowNull:false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'appointments',
    }
);

module.exports = Appointments;