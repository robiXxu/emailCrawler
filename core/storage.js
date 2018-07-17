const fs = require('fs');

const storage = (config) => (tag, emails) => {
  return new Promise((resolve, reject) => {
    if( !config ) reject("No config provided");
    if( !tag ) reject("No tag provided");
    if( !emails ) reject("No emails provided");

    fs.appendFile(
      `${config.outputDir}/${tag}.txt`, 
      emails.join("\n"), 
      (err) => resolve);
  });  
};

module.exports = (config) => ({ 
  storage: storage(config)
});