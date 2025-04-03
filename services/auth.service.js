const { ROLE } = require('../constants');
const userDao = require('../dao/user.dao');
const { hashPassword, comparePassword } = require('./password.service');

const login = async (req, res) => {
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

    res.status(200).json('Login successful');
  } catch (err) {
    console.log(err.message);
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

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  login,
  register,
};
