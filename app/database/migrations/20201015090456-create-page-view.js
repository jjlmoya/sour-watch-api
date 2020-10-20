'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('PageViews', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            url: {
                allowNull: false,
                type: Sequelize.STRING
            },
            typeId: {
                references: {
                    model: 'PageTypes',
                    key: 'id'
                },
                allowNull: false,
                type: Sequelize.INTEGER
            },
            visitedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('PageViews')
    }
}
