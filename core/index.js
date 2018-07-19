const { extend } = require('lodash');
module.exports = ({ google, config }) => extend(
  {},
  require('./search')(google),
  require('./gather')(config),
  require('./storage')(config.storage)
);