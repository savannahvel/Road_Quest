const router = require('express').Router();

const markerRoutes = require('./api/markers-routes');
const tripsRoutes = require('./api/trips-routes');
const userRoutes = require('./api/user-routes');
// const homeRoutes = require('./homeRoutes');
// const dashboardRoutes = require('./dashboardRoutes');

router.use('/markers', markerRoutes);
router.use('/trips', tripsRoutes);
router.use('/user', userRoutes);
// router.use('/', homeRoutes);
// router.use('/dashboard', dashboardRoutes);

module.exports = router;