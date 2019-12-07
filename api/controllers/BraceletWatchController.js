const BraceletWatch = require('../models/BraceletWatch');
const authService = require('../services/auth.service');

const BraceletWatchController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const braceletWatch = await BraceletWatch.create({
        watch_id: body.watch_id,
        bracelet_id: body.bracelet_id,
      });
      const token = authService().issue({ id: braceletWatch.id });

      return res.status(200).json({ token, braceletWatch });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, (err) => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  const read = async (req, res) => {
    try {
      const braceletsWatches = await BraceletWatch.findAll();
      return res.status(200).json({ braceletsWatches });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    create,
    validate,
    read,
  };
};

module.exports = BraceletWatchController;
