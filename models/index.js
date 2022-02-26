const Appointments = require('./Appointments');
const Attendance = require('./Attendance');
const Contacts = require('./Contacts');
const Events = require('./Events');
const Insurances = require('./Insurances');
const Payments = require('./Payments');
const Trips = require('./Trips');
const Users = require('./User');

Users.hasMany(Insurances, {
    foreignerKey: 'id',
    onDelete: 'CASCADE'
});
Insurances.belongsTo(Users,{
    foreignerKey: 'id',
});

Users.hasMany(Contacts,{
    foreignerKey:'id',
    onDelete: 'CASCADE',
});

Contacts.belongsTo(Users, {
    foreignerKey:'id'
});

Users.hasMany(Payments,{
    foreignerKey: 'id',
    onDelete: 'CASCADE'
});

Payments.belongsTo(Users, {
    foreignerKey: 'id'
});

Users.hasMany(Attendance, {
    foreignerKey: 'id',
    onDelete: 'CASCADE'
});

Attendance.belongsTo(Users,{
    foreignerKey: 'id'
});

// We still need to add associations for Users with Trips and Events

module.exports = {
    Appointments,
    Attendance,
    Contacts,
    Events,
    Insurances,
    Payments,
    Users,
    Trips,
};