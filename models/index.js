const Appointments = require('./Appointments');
const Attendance = require('./Attendance');
const Contacts = require('./Contacts');
const Events = require('./Events');
const Insurances = require('./Insurances');
const Payments = require('./Payments');
const Trips = require('./Trips');
const Users = require('./User');
const UserTrips = require('./UserTrips');

Users.hasMany(Insurances, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});
Insurances.belongsTo(Users,{
    foreignKey: 'id',
});

Users.hasMany(Contacts,{
    foreignKey:'id',
    onDelete: 'CASCADE',
});

Contacts.belongsTo(Users, {
    foreignKey:'id'
});

Users.hasMany(Payments,{
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Payments.belongsTo(Users, {
    foreignKey: 'id'
});

Users.hasMany(Attendance, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Attendance.belongsTo(Users,{
    foreignKey: 'id'
});

Users.belongsToMany(Trips, { through: UserTrips, foreignKey: 'user_id' });

Trips.belongsToMany(Users, { through: UserTrips, foreignKey: 'trip_id' });

module.exports = {
    Appointments,
    Attendance,
    Contacts,
    Events,
    Insurances,
    Payments,
    Users,
    Trips,
    UserTrips,
};