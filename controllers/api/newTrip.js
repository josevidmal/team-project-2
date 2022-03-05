// REQUIRE FOR PACKAGES TO USE
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const isAdmin = require('../../utils/admin');
const { Trips } = require('../../models/index');
const multer = require("multer");

router.post('/', withAuth, isAdmin, async (req, res) => {
    try {
        const newTrip = await Trips.create({
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
            trip_date: req.body.trip_date,
        });
        res.status(200).json(newTrip);
    } catch (err) {
        res.status(500).json(err);
    }
});

const upload = multer({dest: 'public/images'});

/* const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `files/admin-${file.filename}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[1] === "jpeg") {
        cb(null, true);
    } else {
        cb(new Error("Not a jpeg file!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
}) */

router.post('/addimage', withAuth, isAdmin, upload.single('myFile'), async (req, res) => {
    console.log(req.file);
    try {
        const tripImage = await Trips.update(
            { trip_image: req.file.filename },
            { where: { trip_image: null } }
        )
        
        const tripsData = await Trips.findAll();

        const trips = tripsData.map((trip) => trip.get({ plain: true }));
        console.log("getting all trips handlebars", trips);

        res.status(200).render('homepage', {
            trips,
            logged_in: req.session.logged_in,
            isAdmin: req.session.isAdmin
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;