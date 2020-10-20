'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Watch extends Model {
        static associate ({
            Watch, Brand, Collection, Mechanism, Gender,
            Case, Resistance, Bracelet, MechanismsWatch,
            BraceletsWatch
        }) {
            Watch.belongsTo(Brand, { as: 'brand', foreignKey: 'brandId' })
            Watch.belongsTo(Collection, { as: 'collection', foreignKey: 'collectionId' })
            Watch.belongsToMany(Mechanism, { as: 'mechanisms', foreignKey: 'mechanismId', through: MechanismsWatch })
            Watch.belongsToMany(Bracelet, { as: 'bracelets', foreignKey: 'braceletsId', through: BraceletsWatch })
            Watch.belongsTo(Gender, { as: 'gender', foreignKey: 'genderId' })
            Watch.belongsTo(Case, { as: 'case', foreignKey: 'caseId' })
            Watch.belongsTo(Resistance, { as: 'resistance', foreignKey: 'resistanceId' })
        }
    }

    Watch.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        collectionId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Collections',
                key: 'id'
            }
        },
        brandId: {
            allowNull: true,
            type: DataTypes.STRING,
            references: {
                model: 'Brands',
                key: 'id'
            }
        },
        model: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        discount: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.TEXT
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date(),
            allowNull: false
        },
        genderId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Genders',
                key: 'id'
            }
        },
        mechanismId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Mechanisms',
                key: 'id'
            }
        },
        bracelet: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Bracelets',
                key: 'id'
            }
        },
        caseMaterialId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Cases',
                key: 'id'
            }
        },
        waterResistantId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Resistances',
                key: 'id'
            }
        },
        widthCase: {
            type: DataTypes.INTEGER
        },
        heightCase: {
            type: DataTypes.INTEGER
        },
        thicknessCase: {
            type: DataTypes.INTEGER
        },
        glassId: {
            type: DataTypes.STRING,
            references: {
                model: 'Glasses',
                key: 'id'
            }
        },
        special: {
            type: DataTypes.BOOLEAN
        }
    }, {
        sequelize,
        modelName: 'Watch'
    })
    return Watch
}
