'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Calibre extends Model {
        static associate ({ Calibre, Mechanism }) {
            Calibre.hasMany(Mechanism, { as: 'mechanisms', foreignKey: 'calibreId' })
        }
    };
    Calibre.init({
        code: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Calibre'
    })
    return Calibre
}
