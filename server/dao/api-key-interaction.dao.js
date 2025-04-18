const { ApiKeyInteraction, User } = require('../models/index');

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

async function getApiKeyInteractionByApiKeyId(keyId) {
  try {
    console.log(keyId);

    return ApiKeyInteraction.findAll({
      where: { apiKeyId: keyId },
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
    });
  } catch (error) {
    console.error('Error fetching API key interactions by apiKeyId:', error);
    throw error;
  }
}

module.exports = {
  createApiKeyInteraction,
  getApiKeyInteractionByApiKeyId,
};
