const apiKeyDao = require('../dao/api-key.dao');
const { generateApiKey } = require('./crypto.service');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');
const { sequelize } = require('../models/index');

const getUserApiKeys = async (req, res) => {
  try {
    const userId = req.user.userId;

    const apiKeys = await apiKeyDao.getApiKeysByUserId(userId);

    res.status(STATUS_CODES.OK).json(apiKeys);
  } catch (err) {
    console.error(err);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_API_KEY);
  }
};

const createNewApiKey = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const userId = req.user.userId;

    const apiKey = await generateApiKey();

    // Then create the new API key
    await apiKeyDao.createApiKey(apiKey, userId, transaction);

    await transaction.commit();
    res
      .status(STATUS_CODES.CREATED)
      .json({ message: 'Api Key created successfully!' });
  } catch (err) {
    await transaction.rollback();
    console.error(err);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_CREATE_API_KEY);
  }
};

const revokeApiKey = async (req, res) => {
  try {
    const { id } = req.params;

    await apiKeyDao.deleteApiKey(id);

    res
      .status(STATUS_CODES.OK)
      .json({ message: 'API key deleted successfully' });
  } catch (err) {
    console.error(err);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_REVOKE_API_KEY);
  }
};

module.exports = {
  getUserApiKeys,
  createNewApiKey,
  revokeApiKey,
};
