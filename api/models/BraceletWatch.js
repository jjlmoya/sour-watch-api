
const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'bracelets_watches';

const BraceletWatch = sequelize.define('BraceletWatch', {
  watch_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'watches',
      key: 'id',
    },
  },
  bracelet_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'bracelets',
      key: 'id',
    },
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
BraceletWatch.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};

module.exports = BraceletWatch;
