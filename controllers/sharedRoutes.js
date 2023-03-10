const router = require('express').Router();
const { Trips, User } = require('../models');

// Pages seen once logged in

// Secondary user - show all shared routes to secondary user
router.get('/', async (req, res) => {
    // Verify user is logged in
    if (!req.session.user_id) {
        res.redirect('/login');
        return;
    }

    try {
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
        const trips = tripsData.map((trip) => trip.get({ plain: true }));

        if (!trips) {
            res
                .status(400)
                .json({ message: 'Could not find any trips' });
            return;
        }

        res.render('sharedTrips', {
            logged_in: true,
            style: 'allTrips.css',
            showAllTrips: true,
            trips,
        })

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
            title: 'Shared Trip',
            trip,
        })
      } catch (err) {
          res.status(500).json(err);
      };     
})

  
module.exports = router;