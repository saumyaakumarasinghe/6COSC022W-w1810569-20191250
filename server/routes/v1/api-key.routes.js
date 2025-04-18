const express = require('express');
const apiKeyService = require('../../services/api-key.service');
const { checkAuth } = require('../../middleware/check-token.middleware');

const apiKeyRoutes = express.Router();

apiKeyRoutes.use(checkAuth);

apiKeyRoutes.get('/', apiKeyService.getUserApiKeys);

apiKeyRoutes.post('/', apiKeyService.createNewApiKey);

apiKeyRoutes.delete('/:id', apiKeyService.revokeApiKey);

module.exports = apiKeyRoutes;
