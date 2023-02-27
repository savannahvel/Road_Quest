const router = require('express').Router();
const { Trips, User } = require('../models');

router.get('/', async (req, res) => {
    // Verify user is logged in
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    }

    // get user id of logged in user
    try {
        const userId = req.session.user_id;
        res.render('planTrips', {
            logged_in: true,
            style: 'route.css',
            script: 'routemap.js',
            title: 'Plan A Trip',
            UpcomingTrip: true,
            userId,
        });

    } catch (err) {
        res.status(500).json(err);
    }

})
  
module.exports = router;