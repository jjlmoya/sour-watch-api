'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class PageType extends Model {
        static associate ({ PageView, PageType }) {
            PageType.hasMany(PageView, { as: 'pages', foreignKey: 'typeId' })
        }
    }
    PageType.init({
        code: DataTypes.STRING,
        name: DataTypes.STRING
    }, {
        sequelize,
        timestamps: false,
        modelName: 'PageType'
    })
    return PageType
}
