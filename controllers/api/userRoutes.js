// REQUIRE FOR PACKAGES TO USE
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const isAdmin = require('../../utils/admin');
const { Users, UserTrips } = require('../../models/index');
const req = require('express/lib/request');
const res = require('express/lib/response');

// ROUTE TO CREATE A NEW ACCOUNT/SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const userData = await Users.create({
            type: "member",
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            nick_name: req.body.nick_name,
            date_of_birth: req.body.date_of_birth,
            mobile_phone: req.body.mobile_phone,
            tier: 1,
            HUG_id: req.body.HUG_id,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// IF YOU ALREADY HAVE AN ACCOUNT SIGN IN ROUTE
router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'email or password is incorrect, try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'email or password is incorrect, try again' });
            return;
        }


        let isAdmin = false;
        if (userData.type == "admin")
            isAdmin = true;

        req.session.save(() => {
            req.session.isAdmin = isAdmin;
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            
            console.log('User type', userData.type);

            res.json({ user: userData, message: 'You have logged in' });
        })

    } catch (err) {
        res.status(400).json(err);
    }
});

// LOG OUT ROUTE AND SESSION DESTROY
router.post('/logout', (req, res) => {
    // When the user logs out, destroy the session
    if (req.session.logged_in) {
        req.session.destroy(() => {
        res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// USER TRIPS ROUTE
router.post('/trips', withAuth, async (req, res) => {
    try {
        const userTripsData = await UserTrips.create({
            user_id: req.session.user_id,
            trip_id: req.body.trip_id,
        });

        res.status(200).json(userTripsData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// MODULE EXPORTS
module.exports = router;
