const extend = require('lodash/extend');

module.exports = extend(
  {},
  require('./google'),
  require('./tags'),
  require('./crawler'),
  require('./storage'),
  require('./regex'),
  require('./rules')
);