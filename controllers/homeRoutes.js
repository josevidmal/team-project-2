const router = require('express').Router();
const { Users, Trips, Events } = require('../models/index');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const tripsData = await Trips.findAll();

        const trips = tripsData.map((trip) => trip.get({ plain: true }));
        console.log("getting all trips handlebars", trips);

        /* res.render('homepage', {
            trips,
        }); */
        res.send("this is the homepage");
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/trip/:id', withAuth, async (req, res) => {
    try {
        const tripData = await Trips.findByPk(req.params.id)

        const trip = tripData.get({ plain: true });

        /* res.render('trip', {
            ...trip,
            logged_in: req.session.logged_in
        }); */

        res.send(trip);
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
            logged_in: true
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

    res.render('signup');
});

module.exports = router;