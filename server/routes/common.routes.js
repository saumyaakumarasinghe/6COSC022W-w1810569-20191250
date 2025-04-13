const express = require('express');
const commonController = require('../services/common.service');
const commonRoutes = express.Router();

console.log('Common Routes Initialized');

commonRoutes.all('/', commonController.healthCheck);
commonRoutes.all('*', commonController.fallback);

module.exports = commonRoutes;
