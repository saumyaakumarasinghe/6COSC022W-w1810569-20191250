const express = require('express');
const commonController = require('../services/common.service');
const commonRoutes = express.Router();

commonRoutes.all('/', commonController.healthCheck);

commonRoutes.all('*', commonController.fallback);

module.exports = commonRoutes;
