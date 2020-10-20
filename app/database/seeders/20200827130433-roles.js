'use strict'

const faker = require('faker')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Roles', [{
            name: 'Usuario',
            code: 'default'
        }, {
            name: 'Writer',
            code: 'writer'
        }, {
            name: 'Admin',
            code: 'admin'
        }])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Roles', null, {})
    }
}
