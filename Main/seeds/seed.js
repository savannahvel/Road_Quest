const sequelize = require('../config/connection');
const { User, Trips } = require('../models');

const userData = require('./userData.json');
const tripData = require('./Trips.json');
const Makrers = require("./Markers.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData,{
    individualHooks: true,
    returning: true,
  });

  for (const trip of tripData) {
    const tripss = await Trips.create({
      ...trip,
      primary_owner: users[Math.floor(Math.random() * users.length)].id,
    });
  }


  process.exit(0);
};

seedDatabase();
