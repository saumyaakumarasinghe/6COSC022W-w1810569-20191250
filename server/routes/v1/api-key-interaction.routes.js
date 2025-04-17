const express = require('express');
const apiKeyService = require('../../services/api-key-interaction.service');
const checkPermissions = require('../../middleware/permission-check.middleware');
const { checkAuth } = require('../../middleware/check-token.middleware');
const { ROLE } = require('../../constants');

const apiKeyInteractionRoutes = express.Router();

apiKeyInteractionRoutes.use(checkAuth);

apiKeyInteractionRoutes.get(
  '/',
  apiKeyService.getAllApiKeyInteractions
);

apiKeyInteractionRoutes.get(
  '/:id',
  apiKeyService.getApiKeyInteractionByApiKeyId
);

module.exports = apiKeyInteractionRoutes;
