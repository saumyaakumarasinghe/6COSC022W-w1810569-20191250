const express = require('express');
const apiKeyService = require('../../services/api-key-interaction.service');
const { checkAuth } = require('../../middleware/check-token.middleware');

const apiKeyInteractionRoutes = express.Router();

apiKeyInteractionRoutes.use(checkAuth);

apiKeyInteractionRoutes.get(
  '/:id',
  apiKeyService.getApiKeyInteractionByApiKeyId
);

module.exports = apiKeyInteractionRoutes;
