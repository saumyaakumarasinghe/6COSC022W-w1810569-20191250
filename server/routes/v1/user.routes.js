const express = require('express');
const userService = require('../../services/user.service');
const checkPermissions = require('../../middleware/permission-check.middleware');
const { ROLE } = require('../../constants');
const userRoutes = express.Router();

userRoutes.use(checkPermissions([ROLE.ADMIN]));

userRoutes.post('/', userService.createUser);

userRoutes.get('/', userService.getAllUsers);

userRoutes.get('/:id', userService.getSingleUser);

userRoutes.patch('/:id/status', userService.updateStatusUser);

userRoutes.put('/:id', userService.updateUser);

userRoutes.delete('/:id', userService.deleteUser);

module.exports = userRoutes;
