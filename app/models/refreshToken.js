'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class RefreshToken extends Model {
        static associate ({ RefreshToken, User }) {
            RefreshToken.belongsTo(User, { as: 'user', foreignKey: 'userId' })
        }
    }

    RefreshToken.init({
        token: DataTypes.TEXT,
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        sequelize,
        modelName: 'RefreshToken'
    })
    return RefreshToken
}
