const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Markers extends Model {}

Markers.init();