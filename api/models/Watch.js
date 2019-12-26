const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'watches';

const Watch = sequelize.define('Watch', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  collection: {
    type: Sequelize.STRING,
  },
  collectionSlug: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: 'collections',
      key: 'slug',
    },
  },
  brand: {
    type: Sequelize.STRING,
  },
  model: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.BIGINT,
  },
  stock: {
    type: Sequelize.INTEGER,
  },
  isNew: {
    type: Sequelize.BOOLEAN,
  },
  discount: {
    type: Sequelize.INTEGER,
  },
  description: {
    type: Sequelize.TEXT,
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
  gender: {
    type: Sequelize.STRING,
  },
  mechanism: {
    type: Sequelize.STRING,
  },
  calibre: {
    type: Sequelize.STRING,
  },
  mechanismOrigin: {
    type: Sequelize.STRING,
  },
  watchCase: {
    type: Sequelize.STRING,
  },
  waterResistant: {
    type: Sequelize.INTEGER,
  },
  width: {
    type: Sequelize.INTEGER,
  },
  height: {
    type: Sequelize.INTEGER,
  },
  thickness: {
    type: Sequelize.INTEGER,
  },
  glass: {
    type: Sequelize.STRING,
  },
  special: {
    type: Sequelize.BOOLEAN,
  },
}, { tableName });

// eslint-disable-next-line
Watch.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};

module.exports = Watch;

// TODO 1-N Table PromoCodes 1 Watch 1 Discount <-----> 1 Discount N Watches
// TODO 1-N Table Collection 1 Watch 1 Collection <-----> 1 Collection N Watches
