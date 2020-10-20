const Sequelize = require('sequelize');
const sequelize = require('../../config/database');

const tableName = 'properties';
const Property = sequelize.define('Property', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  name: {
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
Property.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};

module.exports = Property;
