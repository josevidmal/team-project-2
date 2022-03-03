const router = require('express').Router();
const userRoutes = require('./userRoutes');
const tripRoutes = require('./tripRoutes');
const newTrip = require('./newTrip');

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/newTrip', newTrip);

module.exports = router;