'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('PageTypes', [{
            id: 1,
            code: 'home',
            name: 'Inicio'
        }, {
            id: 2,
            code: 'details',
            name: 'Detalles'
        }, {
            id: 3,
            code: 'checkout',
            name: 'Checkout'
        }])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('PageType', null, {})
    }
}
