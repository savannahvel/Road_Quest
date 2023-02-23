const router = require('express').Router();
const { Markers, Trips, User } = require('../../models');
// const withAuth = require('../../utils/auth');

// find all markers
router.get('/', async (req, res) => {
    try {
        const markersData = await Markers.findAll(
            {
            include: [
                {
                    model: Trips,
                    attributes: ['id', 'trip_name', 'is_active', 'is_shared'],
                },
            ]},
        );
        res.status(200).json(markersData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create new marker
router.post('/', async (req, res) => {
    try {
        const markersData = await Markers.create({
            location: req.body.location,
            trip_id: req.body.trip_id,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(markersData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// update marker by id 
router.put('/:id', async (req, res) => {
    try {
        const markersData = await Markers.update(req.body, {
            where: {
                id: req.params.id,
            },
        });

        if (!markersData) {
            res.status(404).json({ message: 'No marker found with that id' });
            return;
        }

        res.status(200).json(markersData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete marker by id
router.delete('/:id', async (req, res) => {
    try {
        const markersData = await Markers.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!markersData) {
            res.status(404).json({ message: 'No marker found with that id' });
            return;
        }

        res.status(200).json(markersData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;