const { compact, flatten } = require('lodash');
const { concat } = require('async');

const search = (google) => (tags) => {
  return new Promise((resolve, reject) => {
    if ( !google ) reject("No google ref provided");
    if ( !tags ) reject("No tags provided");

    // Testing purposes
    // resolve(['http://usv.ro', 'http://assist-software.net'])
    const func = [];
    tags.forEach((tag) => {
      func.push();
    });

    concat(
      tags,
      (tag, done) => {
        google(tag, (err, res) => {
          if(err) done(err, []);
          const links = res.links.map(l => l.href);
          done(null, compact(links) );
        });
      },
      (err, results) => {
        console.log(results);
        resolve(flatten(results));
      }
    )
    
  });
};

module.exports = (google) => ({
  search: search(google)
})