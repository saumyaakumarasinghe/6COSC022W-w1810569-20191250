const { ApiKeyInteraction } = require('../models/index');

async function createApiKeyInteraction(apiKeyId, userId, log) {
  try {
    console.log(`API key interaction: ${apiKeyId}, ${userId}, ${log}`);

    return ApiKeyInteraction.create({
      apiKeyId,
      userId,
      log,
    });
  } catch (error) {
    console.error('Error creating API key interaction:', error);
    throw error;
  }
}

async function getAllApiKeyInteractions() {
  try {
    return ApiKeyInteraction.findAll();
  } catch (error) {
    console.error('Error fetching API key interactions:', error);
    throw error;
  }
}

async function getApiKeyInteractionByApiKeyId(keyId) {
  try {
    console.log(keyId);

    return ApiKeyInteraction.findAll({
      where: { apiKeyId: keyId },
    });
  } catch (error) {
    console.error('Error fetching API key interactions by apiKeyId:', error);
    throw error;
  }
}

module.exports = {
  createApiKeyInteraction,
  getAllApiKeyInteractions,
  getApiKeyInteractionByApiKeyId,
};
