const search = (google) => (tags) => {
  return new Promise((resolve, reject) => {
    if ( !google ) reject("No google ref provided");
    if ( !tags ) reject("No tags provided");
    google(tags.join(' '), (err, res) => {
      if(err) reject(err);
      resolve(
        res.links.map(l => l.href)
      );
    });
  });
};

module.exports = (google) => ({
  search: search(google)
})