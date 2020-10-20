'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class NotificationType extends Model {
        static associate ({ Notification, NotificationType }) {
            NotificationType.hasMany(Notification, { as: 'type', foreignKey: 'typeId' })
        }
    }
    NotificationType.init({
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        modelName: 'NotificationType'
    })
    return NotificationType
}
