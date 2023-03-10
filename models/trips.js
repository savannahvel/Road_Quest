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
    trip_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_point: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_point: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_shared: {
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
