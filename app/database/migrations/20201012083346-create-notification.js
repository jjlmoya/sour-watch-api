'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Notifications', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            message: {
                type: Sequelize.STRING
            },
            receiverId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    as: 'receiver',
                    key: 'id'
                }
            },
            typeId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'NotificationTypes',
                    as: 'type',
                    key: 'id'
                }
            },
            url: {
                type: Sequelize.STRING
            },
            read: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()

            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: new Date()
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Notifications')
    }
}
