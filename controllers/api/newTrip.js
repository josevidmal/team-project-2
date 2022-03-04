// REQUIRE FOR PACKAGES TO USE
const router = require('express').Router();
const withAuth = require('../../utils/auth');
const isAdmin = require('../../utils/admin');
const { Trips } = require('../../models/index');
const multer  = require('multer');
const path = require('path');
//const upload = multer({ dest: 'public/images/' })


// STORE IMAGE USING MULTER
var storage = multer.diskStorage({
    // SET DESTINATION FOR FILE
    destination: (req, file, callBack) => {
        callBack(null, './public/images/')     // './public/images/' directory name where save the file
    },
    // CREATE FILENAME ON SERVER
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

// ASIGN UPLOAD TO MULTER
var upload = multer({
    storage: storage
});

// ROUTE TO POST THE NEW TRIP TO THE SERVER
router.post('/', withAuth, isAdmin, upload.single('image_input'), async (req, res) => {
    // TODO: REMOVE THIS CONSOLOG WHEN OK
    console.log("file dentro del route newTRIP",req.file);
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
            trip_image: req.body.trip_image
        });
        res.status(200).json(newTrip);
    } catch (err) {
        res.status(500).json(err);
    }
});


// MODULE EXPORTS
module.exports = router;