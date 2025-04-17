const express = require('express');
const routesV1 = express.Router();
const { checkAuth } = require('../../middleware/check-token.middleware');
const { validateAPIKey } = require('../../middleware/check-api-key.middleware');

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const countryRoutes = require('./country.routes');

routesV1.use('/oauth', authRoutes);
routesV1.use('/user', checkAuth, validateAPIKey, userRoutes);
routesV1.use('/country', checkAuth, validateAPIKey, countryRoutes);

module.exports = routesV1;
