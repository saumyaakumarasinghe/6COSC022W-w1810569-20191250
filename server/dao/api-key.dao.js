const { ApiKey, User } = require('../models/index');

async function createApiKey(key, userId, transaction) {
  try {
    return ApiKey.create(
      {
        key,
        userId,
        status: true,
      },
      { transaction }
    );
  } catch (error) {
    console.error('Error creating api key:', error);
    throw error;
  }
}

async function getApiKeysByUserId(userId) {
  try {
    return ApiKey.findAll({
      where: { userId, status: true },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching api keys by user id:', error);
    throw error;
  }
}

async function getApiKeyByKey(key) {
  try {
    return ApiKey.findOne({
      where: { key, status: true },
    });
  } catch (error) {
    console.error('Error fetching api key by key:', error);
    throw error;
  }
}

async function deleteApiKey(id) {
  try {
    console.log(`Deleting API key with ID: ${id}`);

    return ApiKey.update({ status: 0 }, { where: { id: id } });
  } catch (error) {
    console.error('Error deleting api key:', error);
    throw error;
  }
}

module.exports = {
  createApiKey,
  getApiKeyByKey,
  getApiKeysByUserId,
  deleteApiKey,
};
