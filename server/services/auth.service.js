const { ROLE } = require('../constants');
const userDao = require('../dao/user.dao');
const { hashPassword, comparePassword } = require('./password.service');
const { generateToken } = require('./token.service');
const { generateApiKey } = require('./api-key.service');
const { createApiKey } = require('../dao/api-key.dao');
const { updateUser } = require('../dao/user.dao');
const { sequelize } = require('../models/index');

const login = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { email, password } = req.body;

    // validate request body
    if (!email || !password) {
      return res.status(403).json('Invalid request body properties!');
    }

    // check if user exists
    const existUser = await userDao.getUserByEmail(email);
    if (!existUser) return res.status(404).json('User not found!');

    const loggedIn = await comparePassword(password, existUser.password);
    if (!loggedIn) return res.status(500).json('Invalid request credentials!');

    // update last active at
    const now = Date.now();
    const updatedUser = await updateUser(existUser.id, { now }, transaction);

    const apiKey = await generateApiKey();
    // create api key
    await createApiKey(apiKey, Number(existUser.id), transaction);

    // create token
    const tokenPayload = {
      userId: existUser.id,
      role: existUser.role,
      status: existUser.status,
      lastActiveAt: updatedUser.lastActiveAt,
    };
    const token = await generateToken(tokenPayload);

    const payload = {
      message: 'Login successful',
      userId: tokenPayload.userId,
      token,
      apiKey,
    };
    await transaction.commit();
    res.status(200).json(payload);
  } catch (err) {
    await transaction.rollback();
    console.log(err.message);
    return res.status(500).json('Login failed');
  }
};

const register = async (req, res) => {
  try {
    let { firstName, lastName, email, mobile, password } = req.body;

    // validate request body
    if (!firstName || !lastName || !email || !mobile || !password) {
      return res.status(403).json('Invalid request body properties!');
    }

    // check email already exist
    const existUser = await userDao.getUserByEmail(email);
    if (existUser) return res.status(200).json('User already exists!');

    password = await hashPassword(password);
    const role = ROLE.USER;

    const user = await userDao.createUser(
      firstName,
      lastName,
      email,
      mobile,
      password,
      role
    );

    const payload = {
      userId: user.id,
    };
    res.status(200).json(payload);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json('Registration failed');
  }
};

module.exports = {
  login,
  register,
};
