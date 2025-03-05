const express = require("express");
const authController = require("../../services/auth.service");
const authRoutes = express.Router();

authRoutes.post('/login', authController.login);

module.exports = authRoutes;