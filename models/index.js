const User = require("./users");
const Trips = require("./trips");
const Markers = require("./markers");


User.hasMany(Trips, {
  foreignKey: "primary_owner",
});

Trips.belongsTo(User, {
  foreignKey: "primary_owner",
  onDelete: "CASCADE",
});


Trips.hasMany(Markers,{
  foreignKey:"trip_id"
})
Markers.belongsTo(Trips,{
  foreignKey:"trip_id",
  onDelete: "CASCADE"
})
module.exports = {
  User,
  Trips,
  Markers,
};
