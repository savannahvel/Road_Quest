const sequelize = require('../config/connection');
const { User, Project } = require('../models');

const userData = require('./userData.json');
const Trips = require('./Trips.json');
const Makrers = require("./Markers.json");
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Trips = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of Trips) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
