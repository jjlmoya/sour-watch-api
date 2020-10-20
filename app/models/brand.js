'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Brand extends Model {
        static associate ({ Brand, Watch }) {
            Brand.hasMany(Watch, { as: 'watches', foreignKey: 'brandId' })
        }
    };
    Brand.init({
        name: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Brand'
    })
    return Brand
}
