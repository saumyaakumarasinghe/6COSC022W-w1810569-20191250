const crypto = require('crypto');

const generateApiKey = async () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateApiKey,
};
