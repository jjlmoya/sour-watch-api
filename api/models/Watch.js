const Sequelize = require('sequelize');
const Image = require('../models/Image');
const Barcelet = require('../models/Bracelet');

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
}, { tableName });

// eslint-disable-next-line
Watch.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};
Watch.hasMany(Image, { as: 'images', foreignKey: 'watchID' });
module.exports = Watch;
