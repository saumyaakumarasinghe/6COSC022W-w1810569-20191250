const express = require('express');
const routesV1 = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

routesV1.use('/oauth', authRoutes);
routesV1.use('/user', userRoutes);

module.exports = routesV1;
