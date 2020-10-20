'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Collection extends Model {
        static associate ({ Collection, Watch }) {
            Collection.hasMany(Watch, { as: 'watches', foreignKey: 'collectionId' })
        }
    };
    Collection.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Collection'
    })
    return Collection
}
