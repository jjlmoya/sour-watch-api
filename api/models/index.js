const Bracelet = require('../models/Bracelet');
const Collection = require('../models/Collection');
const Image = require('../models/Image');
const Property = require('../models/Property');
const Watch = require('../models/Watch');
const BraceletWatch = require('../models/BraceletWatch');
const WatchProperty = require('../models/WatchProperty');


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


module.exports = {
  Bracelet,
  Collection,
  Image,
  Property,
  Watch,
  WatchProperty,
  BraceletWatch,
};

