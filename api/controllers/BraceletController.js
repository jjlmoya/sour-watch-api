const Bracelet = require('../models/Bracelet');
const authService = require('../services/auth.service');

const BraceletController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const bracelet = await Bracelet.create({
        id: body.id,
        material: body.material,
        width: body.width,
        integrated: body.integrated,
        perforated: body.perforated,
      });
      const token = authService().issue({ id: bracelet.id });

      return res.status(200).json({ token, bracelet });
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
      const bracelets = await Bracelet.findAll();
      return res.status(200).json({ bracelets });
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

module.exports = BraceletController;
