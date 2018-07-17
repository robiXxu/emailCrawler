const Scraper = require('email-crawler');
const { parallel } = require('async');
const { flatten } = require('lodash');

const gather = (links) => {
  return new Promise((resolve, reject) => {
    if( !links ) reject("Invalid params");
    console.log(links);
    const func = [];

    links.forEach((link) => {
      func.push((callback) => {
        new Scraper(link)
          .getLevels(1)
          .then(data => {
            callback(null, data)
          })
          .catch(error => {
            callback(error,null)
          });
      })
    });

    parallel(func, (err, results)=> {
      if( err && results.length === 0 ) resolve([]);
      resolve(flatten(results));
    });
    
  });
};

module.exports = { gather };
