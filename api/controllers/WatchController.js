const Watch = require('../models/Watch');
const Bracelet = require('../models/Bracelet');
const authService = require('../services/auth.service');

const WatchController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const watch = await Watch.create({
        collection: body.collection,
        brand: body.brand,
        model: body.model,
        price: body.price,
        stock: body.stock,
        isNew: body.isNew,
        discount: body.discount,
        description: body.description,
      });
      const token = authService().issue({ id: watch.id });
      return res.status(200).json({ token, watch });
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
      const watches = await Watch.findAll({
        include: [
          'images',
          'bracelets',
        ],
      });
      return res.status(200).json({ watches });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        msg: 'Internal server error',
        error: err,
      });
    }
  };


  return {
    create,
    validate,
    read,
  };
};

module.exports = WatchController;
