const User = require("./users");
const Trips = require("./trips");
// const SharedTrips = require('./shared-trips');
// const Markers = require('./shared-trips');

User.hasMany(Trips, {
  foreignKey: "primary_owner",
});

Trips.belongsTo(User, {
  foreignKey: "primary_owner",
  onDelete: "CASCADE",
});

Trips.hasMany(User, {
  foreignKey: "primary_owner",
});

// SharedTrips.hasMany(User, {
//     foreignKey: 'user_id',
// });

// SharedTrips.hasMany(Trips, {
//     foreignKey: 'trip_id',
// });

// Markers.belongsTo(Trips, {
//     foreignKey: 'trip_id',
// });

module.exports = {
  User,
  Trips,
  // SharedTrips,
  // Markers,
};
