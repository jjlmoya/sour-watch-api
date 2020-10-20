'use strict'

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Watches', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            collectionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Collections',
                    key: 'id'
                }
            },
            brandId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Brands',
                    key: 'id'
                }
            },
            model: {
                type: Sequelize.STRING
            },
            price: {
                type: Sequelize.BIGINT
            },
            stock: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            discount: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.TEXT
            },
            genderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Genders',
                    key: 'id'
                }
            },
            mechanismId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Mechanisms',
                    key: 'id'
                }
            },
            watchCaseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Cases',
                    key: 'id'
                }
            },
            waterResistantId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Resistances',
                    key: 'id'
                }
            },
            width: {
                type: Sequelize.INTEGER
            },
            height: {
                type: Sequelize.INTEGER
            },
            thickness: {
                type: Sequelize.INTEGER
            },
            glass: {
                type: Sequelize.STRING
            },
            special: {
                type: Sequelize.BOOLEAN
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Watches')
    }
}
