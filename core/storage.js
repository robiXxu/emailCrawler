const fs = require('fs');
const { uniq } = require('lodash');

const storage = (config) => (tag, emails) => {
  return new Promise((resolve, reject) => {
    if( !config ) reject("No config provided");
    if( !tag ) reject("No tag provided");
    if( !emails ) reject("No emails provided");
    const filePath = `${config.outputDir}/${tag}.txt`;

    checkFileForDuplicates(filePath, emails)
      .then((emails) => {
        if( emails.length === 0 ) resolve();
        
        // Clean and push empty item for newline
        emails = uniq(emails);
        emails.push("");

        fs.appendFile(
          filePath,
          emails.join("\n"), 
          (err) => resolve);
      });
    
    
  });
};

const checkFileForDuplicates = (file, emails) => {
  return new Promise((resolve, reject) => {
    
    fs.exists(file,(exists) => {
      if( !exists ) {
        resolve(emails);
      } else {
        fs.readFile(file, (err, data) => {
          if( err ) {
            console.error(`Error while reading file ${file}. ${err}`);
            resolve(emails);
          }
          data = data.toString();
          emails = emails.filter((email) => !data.includes(email));
          resolve(emails);
        });
      }

    });
  });

};

module.exports = (config) => ({ 
  storage: storage(config)
});