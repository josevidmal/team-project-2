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
Insurances.belogsTo(Users,{
    foreignerKey: 'id',
});

Users.hasMany(Contacts,{
    foreignerKey:'id',
    onDelete: 'CASCADE',
});

Contacts.belogsTo(Users, {
    foreignerKey:'id'
});

Users.hasMany(Payments,{
    foreignerKey: 'id',
    onDelete: 'CASCADE'
});

Payments.belogsTo(Users, {
    foreignerKey: 'id'
});

Users.hasMany(Attendance, {
    foreignerKey: 'id',
    onDelete: 'CASCADE'
});

Attendance.belogsTo(Users,{
    foreignerKey: 'id'
});
