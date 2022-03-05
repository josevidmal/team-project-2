
// REQUIRE FOR PACKAGES TO USE
const router = require('express').Router();
const { Users, Trips, UserTrips } = require('../models/index');
const withAuth = require('../utils/auth');
const isAdmin = require('../utils/admin')

// ROUTE TO HOME PAGE. SHOWING ALL TRIPS
router.get('/', async (req, res) => {
    try {
        const tripsData = await Trips.findAll();

        const trips = tripsData.map((trip) => trip.get({ plain: true }));

        res.render('homepage', {
            trips,
            logged_in: req.session.logged_in,
            isAdmin: req.session.isAdmin
        }); 
    } catch (err) {
        res.status(500).json(err);
    }
});

// ROUTE TO GET THE TRIPS BY ID, REQUIRES TO BE LOGED IN
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

// ROUTE TO GO TO PERSONAL PROFILE, REQUIRES TO BE LOGGED IN
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

// ROUTE TO GO TO THE TRIPS YOU HAVE BEEN TO. WIP
router.get('/profile/mytrips', withAuth, async (req, res) => {
    try {
        const userTripsData = await UserTrips.findAll({
            where: {
                user_id: req.session.user_id
            },
        });

        let trips = [];

        userTripsData.forEach(trip => {
            trips.push(trip.dataValues.trip_id);
        });

        const tripData = await Trips.findAll({
            where: {
                trip_id: trips
            }
        })

        const parsedTripsData = tripData.map((trip) => trip.dataValues);

        res.render('myTrips', {
            parsedTripsData,
            logged_in: req.session.logged_in,
            isAdmin: req.session.isAdmin,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// LOGIN ROUTE WITH REDIRECT TO PROFILE
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login')
});

// SIGNUP ROUTE WITH REDIRECT TO PROFILE ONCE SIGNUP IS FINISHED
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('register');
});

// ROUTE TO CREATE A NEW TRIP IF YOU ARE LOGGED IN AND YOU HAVE ADMIN ROLES
router.get('/newTrip', withAuth, isAdmin, (req,res) => {
    res.render('newTrip', {
        logged_in: req.session.logged_in,
        isAdmin: req.session.isAdmin,
    });
    return;
});

// ROUTE TO DISPLAY ALL TRIP TO CHECK ASSISTANCE IF YOU ARE LOGGED IN AND YOU HAVE ADMIN ROLES
router.get('/tripList', withAuth, isAdmin, async (req,res) => {
    try {
        const tripsData = await Trips.findAll();
        const trips = tripsData.map((trip) => trip.get({ plain: true }));
        res.render('tripList', {
            trips,
            logged_in: req.session.logged_in,
            isAdmin: req.session.isAdmin
        }); 
    } catch (err) {
        res.status(500).json(err);
    }
});


// ROUTE TO GO TO THE TRIPS YOU HAVE BEEN TO. WIP
router.get('/tripAssistant/:id', withAuth, isAdmin, async (req, res) => {
    try {
        console.log("req.param", req.params.id)
        const tripsUserData = await UserTrips.findAll({
            where: {
                trip_id: req.params.id
            },
        });
  console.log("tripsUserData", tripsUserData);
        let users = [];
  
        tripsUserData.forEach(user => {
            users.push(user.dataValues.user_id);
        });

        console.log("Users", users);
        
        const usersData = await Users.findAll({
            where: {
                id: users
            }
        })
  console.log("Users", usersData);
  
        const parsedUsersData = usersData.map((user) => user.dataValues);
  
        console.log("parsedUsers", parsedUsersData);

        res.render('tripAssistant', {
            parsedUsersData,
            logged_in: req.session.logged_in,
            isAdmin: req.session.isAdmin,
        });
    } catch (err) {
        res.status(500).json(err);
    }
  });  

router.get('/newTrip/addimage', withAuth, isAdmin, (req, res) => {
    res.render('addImage', {
        logged_in: req.session.logged_in,
        isAdmin: req.session.isAdmin,
    });
});

// MODULE EXPORT
module.exports = router;