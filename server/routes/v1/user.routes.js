const express = require('express');
const userController = require('../../services/user.service');
const userRoutes = express.Router();

userRoutes.post('/', userController.createUser);
userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:id', userController.getSingleUser);
userRoutes.put('/:id/status', userController.updateUser);
userRoutes.put('/:id', userController.updateStatusUser);
userRoutes.delete('/:id', userController.deleteUser);

module.exports = userRoutes;
