const sequelize = require('../config/connection');
const { User, Trips } = require('../models');

const userData = require('./userData.json');
const tripData = require('./Trips.json');
// const Makrers = require("./Markers.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log(tripData);

  const Users = await User.bulkCreate(userData);

  for (const { id } of Users) {
    const tripss = await Trips.create({
      user_id: id,
    });
  }

  process.exit(0);
};

seedDatabase();
