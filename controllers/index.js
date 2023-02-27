const router = require('express').Router();

const markerRoutes = require('./api/markers-routes');
const tripsRoutes = require('./api/trips-routes');
const userRoutes = require('./api/user-routes');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const sharedTripRoutes = require('./sharedRoutes');
const planTripRoutes = require('./planTripRoutes');

// API routes
router.use('/markers', markerRoutes);
router.use('/trips', tripsRoutes);
router.use('/user', userRoutes);
// FE routes
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/planTrip', planTripRoutes);
router.use('/sharedTrips', sharedTripRoutes);
router.use('/logout', homeRoutes);

module.exports = router;