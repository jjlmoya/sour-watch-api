
const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'watches_properties';

const WatchProperty = sequelize.define('WatchProperty', {
  watch_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'watches',
      key: 'id',
    },
  },
  property_id: {
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

module.exports = WatchProperty;
