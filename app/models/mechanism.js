'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Mechanism extends Model {
        static associate ({ Mechanism, Watch, Calibre, MechanismsWatch }) {
            Watch.belongsToMany(Mechanism, { as: 'watchesM', foreignKey: 'mechanismId', through: MechanismsWatch })
            Mechanism.belongsTo(Calibre, { as: 'calibre', foreignKey: 'calibreId' })
        }
    };
    Mechanism.init({
        name: DataTypes.STRING,
        country: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Countries',
                key: 'id'
            }
        },
        calibreId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Calibres',
                key: 'id'
            }
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Mechanism'
    })
    return Mechanism
}
