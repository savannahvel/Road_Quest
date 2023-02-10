const router = require('express').Router();

const markerRoutes = require('./markers-routes');
const sharedTripRoutes = require('./shared-trips-routes');
const tripsRoutes = require('./trips-routes');
const userRoutes = require('./user-routes');

router.use('/markers', markerRoutes);
router.use('/shared-trips', sharedTripRoutes);
router.use('/trips', tripsRoutes);
router.use('/user', userRoutes);

module.exports = router;