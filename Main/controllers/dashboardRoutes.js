const router = require('express').Router();
const { Trips } = require('../models/trips');

// Pages seen once logged in

// User has trip planned: 
router.get('/', async (req, res) => {
    // Verify user is logged in
    // if (!req.session.user_id) {
    //     res.redirect('/login');
    //     return;
    // }

    // Write get route that queries for uncompleted trip (if multiple, then the select first)

    res.render('dashboard', {
        style: 'maps.css',
        script: 'script.js',
        title: 'Upcoming Trip',
        UpcomingTrip: true,
    })
})

//TODO:
// View completed trips

// User is planning a trip
router.get('/plan', async (req, res) => {
    // Verify user is logged in
    // if (!req.session.user_id) {
    //     res.redirect('/login');
    //     return;
    // }

    res.render('dashboard', {
        style: 'maps.css',
        script: 'script.js',
        title: 'Plan A Trip',
        PlanTrip: true,
    })
})

//TODO:
// User is viewing all shared trips

// User is viewing specific shared trip
router.get('/shared/:id', async (req, res) => {
    const sharedTripData = await Trips.findOne({
        where: {
            id: req.params.id
        }
    });

    const sharedTrip = sharedTripData.get({ plain: true });
    res.render('shared', { ...sharedTrip });
})

module.exports = router;