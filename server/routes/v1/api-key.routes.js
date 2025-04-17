const express = require('express');
const apiKeyService = require('../../services/api-key.service');
const checkPermissions = require('../../middleware/permission-check.middleware');
const { checkAuth } = require('../../middleware/check-token.middleware');
const { ROLE } = require('../../constants');

const apiKeyRoutes = express.Router();

apiKeyRoutes.use(checkAuth);

// Admin-only routes
apiKeyRoutes.get(
  '/list',
  checkPermissions([ROLE.ADMIN]),
  apiKeyService.getApiKeysList
);

apiKeyRoutes.get(
  '/stats',
  checkPermissions([ROLE.ADMIN]),
  apiKeyService.getApiKeyStats
);

// User routes
apiKeyRoutes.get('/', apiKeyService.getUserApiKeys);

apiKeyRoutes.post('/', apiKeyService.createNewApiKey);

apiKeyRoutes.delete('/:id', apiKeyService.revokeApiKey);

module.exports = apiKeyRoutes;
