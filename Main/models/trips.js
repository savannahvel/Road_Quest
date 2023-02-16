const { Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require("../config/connection");

class Trips extends Model {}

Trips.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    departure: {
      type: DataTypes.DATE,
      allowNull: false,
     
    },
    trip_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    primary_owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      referneces: {
        model: "users",
        key: "id",
      },
    },
  },
  {

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Trips",
  }
);

module.exports = Trips;
