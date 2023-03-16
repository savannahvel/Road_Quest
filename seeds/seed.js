const Sequelize = require("../config/connection");
const { User, Trips, Markers } = require("../models");

const userData = require("./userData.json");
const tripData = require("./Trips.json");
const MarkersData = require("./Markers.json");

const seedDatabase = async () => {

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const tripsArray = [];

  for (const trip of tripData) {
    const tripData = await Trips.create({
      ...trip,
      primary_owner: users[Math.floor(Math.random() * users.length)].id,
      
    });
    tripsArray.push(tripData)
  
  }

  for (const marker of MarkersData) {
    const markerTable = await Markers.create({
      ...marker,
      trip_id: tripsArray[Math.floor(Math.random() * tripsArray.length)].id,
    });
  }



  process.exit(0);
};

seedDatabase();
