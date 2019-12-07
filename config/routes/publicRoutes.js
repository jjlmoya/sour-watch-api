const publicRoutes = {
  'POST /watch/validate': 'WatchController.validate',
  'POST /watch/read': 'WatchController.read',
  'POST /image/validate': 'ImageController.validate',
  'POST /image/read': 'ImageController.read',
  'POST /property/validate': 'PropertyController.validate',
  'POST /property/read': 'PropertyController.read',
  'POST /watchproperty/validate': 'WatchPropertyController.validate',
  'POST /watchproperty/read': 'WatchPropertyController.read',
  'POST /bracelet/validate': 'BraceletController.validate',
  'POST /bracelet/read': 'BraceletController.read',
  'POST /braceletwatch/validate': 'BraceletWatchController.validate',
  'POST /braceletwatch/read': 'BraceletWatchController.read',
};

module.exports = publicRoutes;
