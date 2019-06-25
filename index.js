const createImage = require('./text')
const { json } = require('micro');

module.exports = async (req, res) => {
  const body = await json(req);

  createImage(body.text, res);
}