const Crawler = require('node-web-crawler');
const { extend, uniq, flatten, some, compact } = require('lodash');
const validator = require('email-validator');

const gather = (config) => (links) => {
  return new Promise((resolve, reject) => {
    if( !config ) reject("No crawler config provided");
    if( !links ) reject("No links array provided");
    const list = [];
    console.log(`Nr of Links: ${links.length}`);
    const client = new Crawler(extend(
      config.crawler,
      {
        callback: (error, res, $) => {
          if( error ) reject(error);
          if( !res ) resolve([]);

          const emails = res.body.match( config.regex.email );
          list.push( emails );
        },
        onDrain: () => {
          console.log("Before", list);
          const cleanList = clean(config, list);
          console.log(cleanList);
          console.log(`Nr of emails: ${cleanList.length}`);
          resolve(cleanList);
        }
      }
    ));
    client.queue( links );
  });
}

const clean = (config, emails) => uniq(
  removeBlocked(
    config,
    removeFalsePositive(
      compact(
        flatten(emails)
      )
    )
  )
);

const removeBlocked = (config, emails) => {
  return emails.filter(email => 
    !some(config.rules.blocked, (domain) => 
      email.includes(domain)
    )
  );
};

const removeFalsePositive = (emails) => emails.filter(email => validator.validate(email));



module.exports = (config) => ({
  gather: gather(config)
});