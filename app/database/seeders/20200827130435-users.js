'use strict'
const faker = require('faker')
const bcrypt = require('bcrypt')

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [{
            name: 'Rammus',
            fullname: 'Rammus picha brava',
            roleId: 1,
            password: bcrypt.hashSync('123456', 10),
            email: 'a@a.com',
            avatar: faker.image.avatar(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent()
        }])
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {})
    }
}
