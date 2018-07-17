const extend = require('lodash/extend');

module.exports = extend(
  {},
  require('./google'),
  require('./tags'),
  require('./storage')
);