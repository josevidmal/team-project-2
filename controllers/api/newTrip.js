const router = require('express').Router();
const withAuth = require('../../utils/auth');
const isAdmin = require('../../utils/admin');
const { Trip } = require('../../models/index');
const req = require('express/lib/request');
const res = require('express/lib/response');

router.post('/newTrip', withAuth, isAdmin, async (req, res) => {
    try {
        const newTrip = await Trip.create({
            trip_name: req.body.trip_name,
            destination: req.body.destination,
            trip_hours: req.body.trip_hours,
            trip_days: req.body.trip_days,
            trip_kms: req.body.trip_kms,
            toll_cost: req.body.toll_cost,
            fuel_cost: req.body.fuel_cost,
            food_cost: req.body.food_cost,
            hotel_cost: req.body.hotel_cost,
            difficulty_level: req.body.difficulty_level,
            trip_image: req.body.trip_image
        });
        res.status(200).json(newTrip);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;



