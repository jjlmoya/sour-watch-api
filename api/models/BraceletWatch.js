
const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const Watch = require('../models/Watch');
const Bracelet = require('../models/Bracelet');

const tableName = 'bracelets_watches';

const BraceletWatch = sequelize.define('BraceletWatch', {
  watchID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'watches',
      key: 'id',
    },
  },
  braceletID: {
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
    allowNull: true,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: true,
  },
}, { tableName });

// eslint-disable-next-line
BraceletWatch.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};


Bracelet.belongsToMany(Watch, {
  constraints: false,
  through: {
    model: BraceletWatch,
    unique: false,
  },
  foreignKey: 'braceletID',
});
Watch.belongsToMany(Bracelet, {
  constraints: false,
  as: 'bracelets',
  through: {
    model: BraceletWatch,
    unique: false,
  },
  foreignKey: 'watchID',
});
module.exports = BraceletWatch;
