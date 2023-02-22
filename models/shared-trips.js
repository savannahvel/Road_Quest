// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class SharedTrips extends Model { }

// SharedTrips.init(
//     {
//         trip_id: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'trips',
//                 key: "id",
//             },
//         },
//         secondary_user: {
//             type: DataTypes.INTEGER,
//             allowNull: false,
//             references: {
//                 model: 'user',
//                 key: 'id',
//             },
//         },
//     },
//     {
//         sequelize,
//         timestamps: false,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'SharedTrips',
//     }
// );

// module.exports = SharedTrips;