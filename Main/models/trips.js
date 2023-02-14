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
     
    },
    trip_name: {
      type: DataTypes.STRING,

    },
    is_active: {
      type: DataTypes.BOOLEAN,
    },
    primary_owner: {
      type: DataTypes.INTEGER,
      referneces: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    // hooks: {
    //   beforeCreate: async (newUserData) => {
    //     newUserData.password = await bcrypt.hash(newUserData.password, 10);
    //     return newUserData;
    //   },
    //   beforeUpdate: async (updatedUserData) => {
    //     updatedUserData.password = await bcrypt.hash(
    //       updatedUserData.password,
    //       10
    //     );
    //     return updatedUserData;
    //   },
    // },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Trips",
  }
);

module.exports = Trips;
