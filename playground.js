const validator = require('email-validator');
const fs = require('fs');

fs.readFile('./output/js.txt', (err, data) => {
  const emails = data.toString().split('\n');
  console.log(emails);

  const invalidEmails = emails.map(email => ({ email, valid: validator.validate(email) }));
  console.log(invalidEmails);
})