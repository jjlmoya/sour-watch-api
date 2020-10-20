'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Gender extends Model {
        static associate ({ Gender, Watch }) {
            Gender.hasMany(Watch, { as: 'watches', foreignKey: 'genderId' })
        }
    };
    Gender.init({
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Gender'
    })
    return Gender
}
