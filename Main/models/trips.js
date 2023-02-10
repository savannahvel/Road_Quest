const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trips extends Model {}

Trips.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primary: true,
            autoIncrement: true,
        },
        primary_owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
            referneces: {
                model: 'user',
                key: 'id',
            },
        },
        departure: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trip_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Trips',
    }
);

module.exports = Trips;