'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('MechanismsWatches', {
            mechanismsId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Mechanisms',
                    key: 'id'
                }
            },
            watchId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Watches',
                    key: 'id'
                }
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('MechanismsWatches')
    }
}
