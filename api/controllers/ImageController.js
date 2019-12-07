const Image = require('../models/Image');
const authService = require('../services/auth.service');

const ImageController = () => {
  const create = async (req, res) => {
    const { body } = req;
    try {
      const image = await Image.create({
        watch_id: body.watch_id,
        url: body.url,
        alt: body.alt,
        description: body.description,
        mobile: body.mobile,
      });
      const token = authService().issue({ id: image.id });

      return res.status(200).json({ token, image });
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
      const images = await Image.findAll();
      return res.status(200).json({ images });
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

module.exports = ImageController;
