const crawler = {
  maxConnections: 1,
  forceUTF8: true,
  incomingEncoding: 'utf-8',
  skipDuplicates: true,
  userAgent: 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  referer: 'https://www.google.com',
  jQuery: false
};

module.exports = { crawler };