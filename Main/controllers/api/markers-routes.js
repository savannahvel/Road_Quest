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
                    attributes: ['id', 'departure', 'trip_name', 'is_active', 'is_shared'],
                },
            ]},
        );
        res.status(200).json(markersData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// find marker by id
// router.get('/:id', async (req, res) => {
//     try {
//         const markersData = await Markers.findOne({
//             where: {
//                 id: req.params.id,
//             },
//             include: [
//                 {
//                     model: Trips,
//                     attributes: ['id', 'departure', 'trip_name', 'is_active', 'is_shared'],
//                     include: {
//                         model: User,
//                         attributes: ['name']
//                     }
//                 },
//             ]
//         });

//         if (!markersData) {
//             res.status(404).json({ message: 'No marker found with that id' });
//             return;
//         }

//         res.status(200).json(markersData);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// router.get('/:id', (req, res) => {
//     Markers.findOne({
//         attributes: [ 'id', 'location', 'trip_id'],
//         include: [
//             {
//                 model: Trips,
//                 attributes: [ 'id', 'departure', 'trip_name', 'is_active', 'is_shared'],
//                 include: {
//                     model: User,
//                     attributes: [ 'name' ]
//                 }
//             },
//             // {
//             //     model: User,
//             //     attributes: [ 'name' ]
//             // }
//         ]
//     })
//     .then(markersData => {
//         const markers = markersData.map(markers => markers.get({ plain: true }));
//         res.render('homepage', { markers, loggedIn: req.session.loggedIn });
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });

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