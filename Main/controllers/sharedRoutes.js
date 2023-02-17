const router = require('express').Router();
const { Trips } = require('../models/trips');

// Pages seen once logged in

// Secondary user - show all shared routes to secondary user
router.get('/', async (req, res) => {
    // Verify user is logged in
    // if (!req.session.user_id) {
    //     res.redirect('/login');
    //     return;
    // }

    // Write route that queries for uncompleted trips
    // try {
    //     const userTripsData = await Trips.findOne({

    //     })
    // } catch (err) {}

    res.render('dashboard', {
        style: 'maps.css',
        script: 'markerMap.js',
        title: 'Shared Trip',
        SharedTrip: true,
    })
})

// Secondary user - get specific trip
router.get('/:id', async (req, res) => {
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

module.exports = router;