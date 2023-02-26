const router = require('express').Router();
const { Trips, Markers, User } = require('../../models');
const withAuth = require('../../utils/auth');

// find all trips
router.get('/', withAuth, async (req, res) => {
  try {
    const tripData = await Trips.findAll();
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find trip by id 
router.get('/:id', withAuth, async (req, res) => {
  try {
    const tripsData = await Trips.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Markers,
          attributes: ['id', 'location'],
        },
      ]
    });

    if (!tripsData) {
      res.status(404).json({ message: 'No trip found with that id' });
      return;
    }

    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new trip
router.post('/', withAuth, async (req, res) => {
  try {
    const tripsData = await Trips.create({
      include: [
        {
          model: Markers,
          // model: User,
        },
      ],
      ...req.body,
      trip_name: req.body.trip_name,
      start_point: req.body.start_point,
      end_point: req.body.end_point,
      is_active: req.body.is_active,
      is_shared: req.body.is_shared,
      primary_owner: req.body.primary_owner,
      location: req.body.location,
    });

    req.session.save(() => {
      req.session.logged_in = true;

      res.status(200).json(tripsData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update trip by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const tripsData = await Trips.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!tripsData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete trip by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const tripsData = await Trips.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tripsData) {
      res.status(404).json({ message: 'No trip found with this id!' });
      return;
    }

    res.status(200).json(tripsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
