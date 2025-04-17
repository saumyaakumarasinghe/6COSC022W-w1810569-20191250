const { ApiKey } = require('../models/index');

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

async function getAllApiKeys() {
  try {
    return ApiKey.findAll();
  } catch (error) {
    console.error('Error fetching api keys:', error);
    throw error;
  }
}

async function getApiKeyByKey(key) {
  try {
    return ApiKey.findOne({
      where: { key: key },
    });
  } catch (error) {
    console.error('Error fetching api key by key:', error);
    throw error;
  }
}

module.exports = {
  createApiKey,
  getAllApiKeys,
  getApiKeyByKey,
};
