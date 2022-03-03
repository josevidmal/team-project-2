const router = require('express').Router();
const { Users, Trips, UserTrips } = require('../models/index');
const withAuth = require('../utils/auth');
const isAdmin = require('../utils/admin')

router.get('/', async (req, res) => {
    try {
        const tripsData = await Trips.findAll();

        const trips = tripsData.map((trip) => trip.get({ plain: true }));
        console.log("getting all trips handlebars", trips);

        res.render('homepage', {
            trips,
            logged_in: req.session.logged_in,
            isAdmin: req.session.isAdmin
        }); 
        // res.send("this is the homepage");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/trip/:id', withAuth, async (req, res) => {
    try {
        const tripData = await Trips.findByPk(req.params.id)

        const trip = tripData.get({ plain: true });

        res.render('tripInfo', {
            ...trip,
            logged_in: req.session.logged_in,
            isAdmin: req.session.isAdmin
        });

        // res.send(trip);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await Users.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Trips }],
        });

        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: req.session.logged_in,
            isAdmin: req.session.isAdmin
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile/mytrips', withAuth, async (req, res) => {
    try {
        console.log(req.session.user_id);
        const userTripsData = await UserTrips.findAll({
            where: {
                user_id: req.session.user_id,
            },
            include: [
                {
                    model: Trips,
                    attributes: ['trip_id', 'trip_name', 'destination', 'trip_date', 'trip_image'],
                },
                {
                    model: Users,
                    attributes: ['id']
                }
            ],
        });
        
        const userTrips = userTripsData.map((trip) => trip.get({ plain: true }));

        res.render('myTrips', {
            userTrips,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login')
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('register');
});

router.get('/newTrip', withAuth, isAdmin, (req,res) => {
    res.render('newTrip');
    return;
});


module.exports = router;