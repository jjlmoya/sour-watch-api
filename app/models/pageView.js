'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class PageView extends Model {
        static associate ({ PageView, PageType }) {
            PageView.belongsTo(PageType, { as: 'pageType', foreignKey: 'typeId' })
        }
    }
    PageView.init({
        userId: {
            allowNull: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        url: {
            allowNull: false,
            type: DataTypes.STRING
        },
        typeId: {
            references: {
                model: 'PageTypes',
                key: 'id'
            },
            allowNull: false,
            type: DataTypes.INTEGER
        },
        visitedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'PageView'
    })
    return PageView
}
