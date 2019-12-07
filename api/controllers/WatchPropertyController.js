const WatchProperty = require('../models/WatchProperty');
const authService = require('../services/auth.service');

const WatchPropertyController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const watchProperty = await WatchProperty.create({
        watch_id: body.watch_id,
        property_id: body.property_id,
        value: body.value,
      });
      const token = authService().issue({ id: watchProperty.id });

      return res.status(200).json({ token, watchProperty });
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
      const watchesProperties = await WatchProperty.findAll();
      return res.status(200).json({ watchesProperties });
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

module.exports = WatchPropertyController;
