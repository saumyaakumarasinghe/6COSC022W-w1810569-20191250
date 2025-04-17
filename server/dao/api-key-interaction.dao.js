const {
  ApiKeyInteraction,
  ApiKey,
  User,
  sequelize,
} = require('../models/index');

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
    return ApiKeyInteraction.findAll({
      include: [
        {
          model: User,
          attributes: ['firstName', 'lastName', 'email'],
        },
      ],
    });
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

async function getApiKeyStats() {
  try {
    // Get individual key stats
    const [keyResults] = await sequelize.query(`
      SELECT 
        ak.id as "apiKeyId",
        ak.key,
        COUNT(aki.id) as "totalUsage",
        ak."userId",
        u."firstName",
        u."lastName",
        u.email,
        MAX(aki."createdAt") as "lastUsed"
      FROM "ApiKeys" ak
      LEFT JOIN "ApiKeyInteractions" aki ON aki."apiKeyId" = ak.id
      LEFT JOIN "Users" u ON u.id = ak."userId"
      WHERE ak.status = true
      GROUP BY ak.id, ak.key, ak."userId", u."firstName", u."lastName", u.email
      ORDER BY "totalUsage" DESC
    `);

    // Get overall stats
    const [overallStats] = await sequelize.query(`
      SELECT 
        COUNT(DISTINCT ak.id) as "totalKeys",
        COUNT(aki.id) as "totalUsage",
        COUNT(DISTINCT ak."userId") as "totalUsers"
      FROM "ApiKeys" ak
      LEFT JOIN "ApiKeyInteractions" aki ON aki."apiKeyId" = ak.id
      WHERE ak.status = true
    `);

    return {
      keys: keyResults,
      overall: overallStats[0],
    };
  } catch (error) {
    console.error('Error getting API key stats:', error);
    throw error;
  }
}

module.exports = {
  createApiKeyInteraction,
  getAllApiKeyInteractions,
  getApiKeyInteractionByApiKeyId,
  getApiKeyStats,
};
