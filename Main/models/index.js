const User = require('./users');
const Trips = require('./trips');
const SharedTrips = require('./shared-trips');
const Markers = require('./shared-trips');

User.hasMany(Trips, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Trips.belongsTo(User , {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

