const router = require('express').Router();
const { Trips } = require('../models');
const withAuth = require('../utils/auth');

// Pages seen once logged in

// Get all user trips
router.get('/', withAuth, async (req, res) => {
    // Verify user is logged in
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }

    // Write get route that queries for all trips
    try {
        const tripsData = await Trips.findAll().catch((err) => {
            res.json(err);
        });
        const trips = tripsData.map((trip) => trip.get({ plain: true }));

        if (!trips) {
            res
                .status(400)
                .json({ message: 'Could not find any trips' });
            return;
        }
        // res.render('all', { trips });
        res.render('dashboard', {
            logged_in: true,
            style: 'route.css',
            script: 'routemap.js',
            title: 'Plan A Trip',
            UpcomingTrip: true,
            trips,
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

//TODO:
// View completed trips

// User is planning a trip
// router.get('/plan', async (req, res) => {
//     // Verify user is logged in
//     // if (!req.session.user_id) {
//     //     res.redirect('/login');
//     //     return;
//     // }

//     res.render('dashboard', {
//         style: 'maps.css',
//         script: 'script.js',
//         title: 'Plan A Trip',
//         PlanTrip: true,
//     })
// })

//TODO:
// User is viewing all shared trips

// User is viewing specific shared trip
// router.get('/shared/:id', async (req, res) => {
//     const sharedTripData = await Trips.findOne({
//         where: {
//             id: req.params.id
//         }
//     });

//     const sharedTrip = sharedTripData.get({ plain: true });
//     res.render('shared', { ...sharedTrip });
// })

module.exports = router;