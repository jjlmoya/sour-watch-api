'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('BraceletsWatches', {
            braceletId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'Bracelets',
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
        await queryInterface.dropTable('BraceletsWatches')
    }
}
