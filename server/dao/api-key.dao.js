const { ApiKey, User, sequelize } = require('../models/index');
const { Op } = require('sequelize');

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

async function getAllApiKeys() {
  try {
    return ApiKey.findAll({
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email', 'status'],
          where: {
            status: true,
          },
        },
      ],
      where: {
        status: true,
      },
      order: [['createdAt', 'DESC']],
    });
  } catch (error) {
    console.error('Error fetching api keys:', error);
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

async function getApiKeyById(id) {
  try {
    return ApiKey.findByPk(id);
  } catch (error) {
    console.error('Error fetching api key by id:', error);
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

async function deactivateUserApiKeys(userId, transaction) {
  try {
    // Step 1: Find the most recently created API key for the user
    const mostRecentApiKey = await ApiKey.findOne({
      where: {
        userId: userId,
        status: true,
      },
      order: [['createdAt', 'DESC']], // Order by createdAt in descending order
      transaction,
    });

    // Step 2: If there is a most recent API key, deactivate all others
    if (mostRecentApiKey) {
      return ApiKey.update(
        { status: 0 }, // Deactivate the keys
        {
          where: {
            userId: userId,
            status: true,
            id: { [Op.ne]: mostRecentApiKey.id }, // Exclude the most recent API key
          },
          transaction,
        }
      );
    }

    // If no active API keys found, return null or handle as needed
    return null;
  } catch (error) {
    console.error('Error deactivating user api keys:', error);
    throw error;
  }
}

module.exports = {
  createApiKey,
  getAllApiKeys,
  getApiKeyByKey,
  getApiKeyById,
  getApiKeysByUserId,
  deleteApiKey,
  deactivateUserApiKeys,
};
