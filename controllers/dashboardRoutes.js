const router = require('express').Router();
const { Trips, User } = require('../models');
const withAuth = require('../utils/auth');

// Pages seen once logged in

// Get all user trips
router.get('/', withAuth, async (req, res) => {
    // Verify user is logged in
    if (!req.session.logged_in) {
        res.redirect('/login');
        return;
    }

    // Write get route that queries for all trips for logged in
    try {
        const tripsData = await Trips.findAll({
            include: [{
                model: User,
                as: 'user'
            }],
            where: {
                is_active: true,
                primary_owner: req.session.user_id,
            }
        }).catch((err) => {
            res.json(err);
        });
        const trips = tripsData.map((trip) => trip.get({ plain: true }));

        if (!trips) {
            res
                .status(400)
                .json({ message: 'Could not find any trips' });
            return;
        }

        res.render('dashboard', {
            logged_in: true,
            style: 'allTrips.css',
            showAllTrips: true,
            title: 'Upcoming Trips',
            trips,
        });

    } catch (err) {
        res.status(500).json(err);
    }
})

// Get specific trip
router.get('/:id', async (req, res) => {
    // Verify user is logged in
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    }
    try {
        const tripData = await Trips.findByPk(req.params.id, {
            include: [{
                model: User,
                as: 'user'
            }],
        });

        if(!tripData) {
            res.status(404).json({message: 'No trip found with this id!'});
            return;
        }

        const trip = tripData.get({ plain: true });

        res.render('singleSharedTrip', {
            logged_in: true,
            style: 'maps.css',
            script: 'markerMap.js',
            title: 'Planned Trip',
            trip,
        })
      } catch (err) {
          res.status(500).json(err);
      };     
})

module.exports = router;