const createDefault = require('./text')
module.exports = (req, res) => {
  createDefault('hi', res);
}