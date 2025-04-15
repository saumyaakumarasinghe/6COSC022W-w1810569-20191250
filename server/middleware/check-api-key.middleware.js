const { ERROR_MESSAGES } = require('../constants/error.constants');
const { STATUS_CODES } = require('../constants/status-code.constants');
const {
  getApiKeyByKey,
  updateApiKeyUsageCount,
} = require('../dao/api-key.dao');
const { getUserById } = require('../dao/user.dao');

const validateAPIKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ message: ERROR_MESSAGES.API_KEY_REQUIRED });
  }

  const key = await getApiKeyByKey(apiKey);
  if (!key) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.API_KEY_INVALID });
  }

  // Check if the API key is belongs to a valid user
  const user = await getUserById(key.userId);

  console.log(`API key: ${key.userId}, ${user.id}, ${user.status}`);

  if (
    !user ||
    user.status === false ||
    Number(user.id) !== Number(key.userId)
  ) {
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: ERROR_MESSAGES.API_KEY_INVALID });
  }

  // Update the usage count
  updateApiKeyUsageCount(apiKey);

  next();
};

module.exports = {
  validateAPIKey,
};
