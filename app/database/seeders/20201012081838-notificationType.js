'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('NotificationTypes', [
            {
                code: 'discount',
                name: 'Descuento'
            },
            {
                code: 'cart',
                name: 'Carrito'
            }
        ])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('NotificationType', null, {})
    }
}
