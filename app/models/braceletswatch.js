'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class BraceletsWatch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate (models) {
            // define association here
        }
    };
    BraceletsWatch.init({
        braceletId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Bracelets',
                key: 'id'
            }
        },
        watchId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Watches',
                key: 'id'
            }
        }
    }, {
        sequelize,
        timestamps: false,
        modelName: 'BraceletsWatch'
    })
    return BraceletsWatch
}
