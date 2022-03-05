// REQUIRES FOR PACKAGES TO USE
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const newTrip = require('./newTrip');


// ROUTER
router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/newTrip', newTrip);


// MODULE EXPORTS
module.exports = router;