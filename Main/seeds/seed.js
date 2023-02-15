const sequelize = require('../config/connection');
const { User, Trips } = require('../models');

const userData = require('./userData.json');
// const tripsData = require('./Trips.json');
// const Makrers = require("./Markers.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  // const Tripss = await Trips.bulkCreate(tripsData);
  const Users = await User.bulkCreate(userData);
  process.exit(0);
};

seedDatabase();
