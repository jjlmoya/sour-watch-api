'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate ({ Role, User }) {
            Role.hasMany(User, { as: 'users', foreignKey: 'roleId' })
        }
    }

    Role.init({
        name: DataTypes.STRING,
        code: {
            unique: true,
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Role'
    })
    return Role
}
