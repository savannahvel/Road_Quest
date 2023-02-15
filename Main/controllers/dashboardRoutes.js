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

    // Write route that queries for uncompleted trip (if multiple, then the select first)
    // try {
    //     const userTripsData = await Trips.findOne({

    //     })
    // } catch (err) {}

    res.render('dashboard', {
        style: 'maps.css',
        script: 'script.js'
    })
})

// If user has no trips planned:

module.exports = router;