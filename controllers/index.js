// REQUIRE FOR PACKAGES TO USE
const router = require('express').Router();
const apiRoutes = require('./api/index');
const homeRoutes = require('./homeRoutes');

// ROUTES FOR THE HOME PAGE
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// MODULE EXPORTS
module.exports = router;