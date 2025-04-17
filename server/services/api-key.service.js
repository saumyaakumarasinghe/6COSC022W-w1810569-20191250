const apiKeyDao = require('../dao/api-key.dao');
const apiKeyInteractionDao = require('../dao/api-key-interaction.dao');
const { generateApiKey } = require('./crypto.service');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');
const { User } = require('../models/index');
const { sequelize } = require('../models/index');

const getApiKeysList = async (req, res) => {
  try {
    const apiKeys = await apiKeyDao.getAllApiKeys();

    res.status(STATUS_CODES.OK).json(apiKeys);
  } catch (err) {
    console.error(err);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_API_KEY);
  }
};

async function createApiKey(key, userId, transaction) {
  try {
    return ApiKey.create(
      {
        key,
        userId,
      },
      { transaction }
    );
  } catch (error) {
    console.error('Error creating api key:', error);
    throw error;
  }
}

const getUserApiKeys = async (req, res) => {
  try {
    const userId = req.user.id;
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
  const transaction = await sequelize.transaction(); // Await here
  try {
    const userId = req.user.userId;
    const apiKey = await generateApiKey();

    // Deactivate existing API keys
    await apiKeyDao.deactivateUserApiKeys(userId, transaction); // Ensure transaction is passed

    // Then create the new API key
    await apiKeyDao.createApiKey(apiKey, userId, transaction); // Ensure transaction is passed

    await transaction.commit(); // Commit the transaction
    res
      .status(STATUS_CODES.CREATED)
      .json({ message: 'Api Key created successfully!' });
  } catch (err) {
    await transaction.rollback(); // Await rollback
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

const getApiKeyStats = async (req, res) => {
  try {
    const stats = await apiKeyInteractionDao.getApiKeyStats();
    res.status(STATUS_CODES.OK).json(stats);
  } catch (err) {
    console.error(err);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_API_KEY_STATS);
  }
};

module.exports = {
  getApiKeysList,
  createApiKey,
  getUserApiKeys,
  createNewApiKey,
  revokeApiKey,
  getApiKeyStats,
};
