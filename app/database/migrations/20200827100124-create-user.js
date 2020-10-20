'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING(16),
                unique: true
            },
            fullname: Sequelize.STRING,
            avatar: Sequelize.STRING,
            recoverToken: Sequelize.STRING,
            expireRecover: Sequelize.DATE,
            lastAttempt: Sequelize.DATE,
            attempts: Sequelize.INTEGER,
            email: {
                type: Sequelize.STRING,
                unique: true
            },
            password: Sequelize.STRING,
            roleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Roles',
                    key: 'id'
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users')
    }
}
