const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'images';

const Image = sequelize.define('Image', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  watchID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { // User belongsTo Company 1:1
      model: 'watches',
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
  url: {
    type: Sequelize.STRING,
  },
  alt: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.STRING,
  },
  mobile: {
    type: Sequelize.STRING,
  },
}, { tableName });

// eslint-disable-next-line
Image.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};

module.exports = Image;
