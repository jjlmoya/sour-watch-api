'use strict'
const { Model } = require('sequelize')
const { UserException, userCodes } = require('./../exceptions')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate ({
            User, Role, RefreshToken, Notification
        }) {
            User.belongsTo(Role, { as: 'role', foreignKey: 'roleId' })
            User.hasMany(RefreshToken, { as: 'token', foreignKey: 'userId' })
            User.hasMany(Notification, { as: 'notifications', foreignKey: 'receiverId' })
        }
    }

    User.init({
        name: {
            type: DataTypes.STRING(16),
            unique: true,
            validate: {
                async isUnique (name) {
                    const user = await User.findOne({ where: { name } })
                    if (user) throw new UserException(userCodes.DUPLICATED_NAME, 'Duplicated name')
                }
            }
        },
        fullname: DataTypes.STRING,
        avatar: DataTypes.STRING,
        recoverToken: DataTypes.STRING,
        expireRecover: DataTypes.DATE,
        lastAttempt: DataTypes.DATE,
        attempts: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        replies: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                async isUnique (email) {
                    const user = await User.findOne({ where: { email } })
                    if (user) throw new UserException(userCodes.DUPLICATED_EMAIL, 'Email already registered')
                }
            }
        },
        password: DataTypes.STRING,
        roleId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Roles',
                key: 'id'
            }
        }
    }, {
        hooks: {},
        sequelize,
        modelName: 'User'
    })

    return User
}
