const { ERROR_MESSAGES } = require('../constants/error.constants');
const {
  getApiKeyByKey,
  updateApiKeyUsageCount,
} = require('../dao/api-key.dao');

function validateAPIKey(req, res, next) {
  const apiKey = req.header['x-api-key'];
  if (!apiKey) {
    return res.status(403).json({ message: ERROR_MESSAGES.API_KEY_REQUIRED });
  }

  const key = getApiKeyByKey(apiKey);
  if (!key) {
    return res.status(500).json({ message: ERROR_MESSAGES.API_KEY_INVALID });
  }

  // Update the usage count
  updateApiKeyUsageCount(apiKey);

  next();
}

module.exports = {
  validateAPIKey,
};
