
const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const Watch = require('../models/Watch');
const Property = require('../models/Property');

const tableName = 'watches_properties';

const WatchProperty = sequelize.define('WatchProperty', {
  watchID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'watches',
      key: 'id',
    },
  },
  propertyID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'properties',
      key: 'id',
    },
  },
  value: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
}, { tableName });

// eslint-disable-next-line
WatchProperty.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};
Property.belongsToMany(Watch, {
  constraints: false,
  through: {
    model: WatchProperty,
    unique: false,
  },
  foreignKey: 'propertyID',
});
Watch.belongsToMany(Property, {
  constraints: false,
  as: 'properties',
  through: {
    model: WatchProperty,
    unique: false,
  },
  foreignKey: 'watchID',
});
module.exports = WatchProperty;
