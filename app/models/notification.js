'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Notification extends Model {
        static associate ({ Notification, User, NotificationType }) {
            Notification.belongsTo(User, { as: 'user', foreignKey: 'receiverId' })
            Notification.belongsTo(NotificationType, { as: 'type', foreignKey: 'typeId' })
        }
    };
    Notification.init({
        message: {
            type: DataTypes.STRING
        },
        receiverId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                as: 'receiver',
                key: 'id'
            }
        },
        typeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'NotificationTypes',
                as: 'type',
                key: 'id'
            }
        },
        url: {
            type: DataTypes.STRING
        },
        isAlive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        image: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        modelName: 'Notification'
    })
    return Notification
}
