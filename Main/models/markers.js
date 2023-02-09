const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Markers extends Model { }

Markers.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        location: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        trip_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'trips',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'markers',
    }
);

module.exports = Markers;