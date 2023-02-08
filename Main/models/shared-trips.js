const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SharedTrips extends Model {}

SharedTrips.init();