const { extend } = require('lodash');
const { parallel } = require('async');
const config = require('./config');
const google = extend(require('google'), config.google);

process.setMaxListeners(0);

const core = require('./core')({
  config,
  google
});


const run = () => {
  const func = [];

  Object.keys(config.tags).forEach(key => {
    const tags = config.tags[key];
    func.push((callback) => {
      core
      .search(tags)
      .then(core.gather)
      .then(emails => {
        if(emails.length > 0) 
          return core.storage(key, emails)
      })
      .then(callback)
      .catch(callback);
    });
  });

  parallel(
    func,
    (error) => {
      console.log('done', error);
      process.exit(0); 
    }
  );
}

run();