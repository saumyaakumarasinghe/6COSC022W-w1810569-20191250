const express = require('express');
const userService = require('../../services/user.service');
const userRoutes = express.Router();

userRoutes.post('/', userService.createUser);
userRoutes.get('/', userService.getAllUsers);
userRoutes.get('/:id', userService.getSingleUser);
userRoutes.put('/:id/status', userService.updateUser);
userRoutes.put('/:id', userService.updateStatusUser);
userRoutes.delete('/:id', userService.deleteUser);

module.exports = userRoutes;
