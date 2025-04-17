const express = require('express');
const apiKeyService = require('../../services/api-key.service');
const checkPermissions = require('../../middleware/permission-check.middleware');
const { checkAuth } = require('../../middleware/check-token.middleware');
const { ROLE } = require('../../constants');

const apiKeyRoutes = express.Router();

apiKeyRoutes.use(checkAuth);

apiKeyRoutes.get(
  '/list',
  apiKeyService.getApiKeysList
);

apiKeyRoutes.get(
  '/stats',
  apiKeyService.getApiKeyStats
);

apiKeyRoutes.get('/', apiKeyService.getUserApiKeys);

apiKeyRoutes.post('/', apiKeyService.createNewApiKey);

apiKeyRoutes.delete('/:id', apiKeyService.revokeApiKey);

module.exports = apiKeyRoutes;
