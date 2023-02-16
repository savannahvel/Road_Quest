const router = require('express').Router();
const { Trips } = require('../../models');
// const auth = require('../../utils/auth');

// find all trips
router.get('/', async (req, res) => {
  try {
    const tripData = await Trips.findAll();
    res.status(200).json(tripData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create new trip
router.post('/', async (req, res) => {
  try {
      const tripsData = await Trips.create({
          departure: req.body.departure,
          trip_name: req.body.trip_name,
          is_active: req.body.is_active,
          primary_owner: req.body.primary_owner,
      });

      req.session.save(() => {
          req.session.loggedIn = true;

          res.status(200).json(tripsData);
      });
  } catch (err) {
      res.status(500).json(err);
  }
});

// update trip by id
router.put('/:id', async (req, res) => {
  console.log(req.body)
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
router.delete('/:id', async (req, res) => {
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
