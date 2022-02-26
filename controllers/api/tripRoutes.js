const router = require('express').Router();
const Trips = require('../../models/Trips');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    const allTrips = await Trips.findAll();
    
    return res.status(200).json(allTrips);

  } catch (err) {
    res.status(400).json(err);
    return;
  }
  

});


router.get('/:id', withAuth, async (req, res) => {
  try {
    const tripData = await Trips.findByPk(req.params.id);

    return res.status(200).json(tripData);

  } catch (err) {
    res.status(400).json(err);
    return;
  }
  
});

router.post('/', async (req, res) => {
  try {
    const trip = await Trips.create(req.body);

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
