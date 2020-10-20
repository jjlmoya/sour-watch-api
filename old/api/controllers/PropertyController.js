const Property = require('../models/Property');
const authService = require('../services/auth.service');

const PropertyController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const property = await Property.create({
        name: body.name,
      });
      const token = authService().issue({ id: property.id });
      return res.status(200).json({ token, property });
    } catch (err) {
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
      const properties = await Property.findAll();
      return res.status(200).json({ properties });
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

module.exports = PropertyController;
