// REQUIRE FOR PACKAGES TO USE
const router = require('express').Router();
const Trips = require('../../models/Trips');
const User = require('../../models/User');
const withAuth = require('../../utils/auth');
const isAdmin = require('../../utils/admin');

// ROUTE TO GET ALL TRIPS
router.get('/', async (req, res) => {
  try {
    const allTrips = await Trips.findAll();
    
    return res.status(200).json(allTrips);

  } catch (err) {
    res.status(400).json(err);
    return;
  }
  

});

// ROUTE TO GET TRIPS BY ID REQUIRES TO BE LOGGED IN
router.get('/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Trips.findByPk(req.params.id);

    return res.status(200).json(tripData);

  } catch (err) {
    res.status(400).json(err);
    return;
  }
  
});

// ROUTE TO CREATE A NEW ROUTE FROM FORM INPUT
router.post('/', async (req, res) => {
  try {
    const trip = await Trips.create(req.body);

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tripData = await Trips.destroy({
      where: {
        trip_id: req.params.id,
      },
    });

    if (!tripData) {
      res.status(404).json({ message: "No Trip found with that id!" });
      return;
    }

    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// MODULE EXPORT
module.exports = router;
