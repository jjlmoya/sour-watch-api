'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Case extends Model {
        static associate ({ Case, Watch }) {
            Case.hasMany(Watch, { as: 'watches', foreignKey: 'caseId' })
        }
    };
    Case.init({
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Case'
    })
    return Case
}
