const router = require('express').Router();

// const markerRoutes = require('./api/markers-routes');
// const sharedTripRoutes = require('./api/shared-trips-routes');
// const tripsRoutes = require('./api/trips-routes');
const userRoutes = require('./api/user-routes');

// router.use('/markers', markerRoutes);
// router.use('/shared-trips', sharedTripRoutes);
// router.use('/trips', tripsRoutes);
router.use('/user', userRoutes);

module.exports = router;