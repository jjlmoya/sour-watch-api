'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Resistance extends Model {
        static associate ({ Mechanism, Watch }) {
            Resistance.hasMany(Watch, { as: 'watches', foreignKey: 'resistanceId' })
        }
    };
    Resistance.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Resistance'
    })
    return Resistance
}
