const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'collections';

const Collection = sequelize.define('Collection', {
  slug: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  weight: {
    type: Sequelize.INTEGER,
  },
  banDiscount: {
    type: Sequelize.BOOLEAN,
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
Collection.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};
module.exports = Collection;
