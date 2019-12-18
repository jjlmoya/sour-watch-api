const Collection = require('../models/Collection');
const authService = require('../services/auth.service');

const CollectionController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const collection = await Collection.create({
        name: body.name,
        slug: body.slug,
        weight: body.weight,
        image: body.image,
        description: body.description,
        banDiscount: body.banDiscount,
      });
      const token = authService().issue({ name: collection.id });
      return res.status(200).json({ token, collection });
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
      const collection = await Collection.findAll();
      return res.status(200).json({ collection });
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

module.exports = CollectionController;
