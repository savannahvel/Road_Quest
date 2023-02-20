const router = require('express').Router();
const { Trips, User } = require('../models/');

// Pages seen once logged in

// Secondary user - show all shared routes to secondary user
router.get('/', async (req, res) => {
    // Verify user is logged in
    // if (!req.session.user_id) {
    //     res.redirect('/login');
    //     return;
    // }

    // Write route that queries for uncompleted trips
    try {
        // const usersData = await User.findAll({

        // });
        const tripsData = await Trips.findAll({
            include: [{
                model: User,
                as: 'user'
            }],
            where: {
                is_active: true,
                is_shared: true,
            }
        }).catch((err) => {
            res.json(err);
        });
        console.log(tripsData);
        const trips = tripsData.map((trip) => trip.get({ plain: true }));

        if (!trips) {
            res
                .status(400)
                .json({ message: 'Could not find any trips' });
            return;
        }
        // res.render('all', { trips });
        res.render('sharedTrips', {
            style: 'sharedTrips.css',
            title: 'Shared Trip',
            SharedTripsAll: true,
            trips,
        })

    } catch (err) {
        res.status(500).json(err);
    }

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
        script: 'markerMap.js',
        title: 'Shared Trip',
        SharedTrip: true,
    })
})

module.exports = router;