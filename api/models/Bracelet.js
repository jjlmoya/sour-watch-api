const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'bracelets';

const Bracelet = sequelize.define('Bracelet', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
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
  material: {
    type: Sequelize.STRING,
  },
  width: {
    type: Sequelize.INTEGER,
  },
  integrated: {
    type: Sequelize.BOOLEAN,
  },
  perforated: {
    type: Sequelize.BOOLEAN,
  },
}, { tableName });

// eslint-disable-next-line
Bracelet.prototype.toJSON = function () {
  return Object.assign({}, this.get());
};

module.exports = Bracelet;
