const valpha = require('bwapi');
const lyrics = new valpha({
  headers: {
    'User-Agent': 'Bastion Discord Bot (https://bastionbot.org)'
  }
});

module.exports = (path, options) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await lyrics.request(path, options);

      resolve(response);
    }
    catch (e) {
      reject(e);
    }
  });
};