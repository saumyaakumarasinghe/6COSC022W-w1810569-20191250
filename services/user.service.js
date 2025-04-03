const userDao = require('../dao/user.dao');
const { ROLE } = require('../constants');
const { hashPassword } = require('./password.service');

const createUser = async (req, res) => {
  try {
    let { firstName, lastName, email, mobile, password, role } = req.body;

    // validate request body
    if (!firstName || !lastName || !email || !mobile || !password || !role) {
      return res.status(403).json('Invalid request body properties!');
    }

    // check email already exist
    const existUser = await userDao.getUserByEmail(email);
    if (existUser) return res.status(200).json('User already exists!');

    password = await hashPassword(password);

    const createdUser = await userDao.createUser(
      firstName,
      lastName,
      email,
      mobile,
      password,
      role
    );

    res.status(201).json(createdUser);
  } catch (err) {
    console.log(err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    //TODO play around with params
    const users = await userDao.getAllUsers();

    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check if user exists
    const existUser = await userDao.getUserById(id);
    if (!existUser) return res.status(404).json('User not found!');

    const user = await userDao.getUserById(id);

    res.status(200).json(user);
  } catch (err) {
    console.log(err.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check if user exists
    const existUserById = await userDao.getUserById(id);
    if (!existUserById) return res.status(404).json('User not found!');

    // check email already exist
    if (req.body.email) {
      const existUserByEmail = await userDao.getUserByEmail(req.body.email);

      if (existUserByEmail && existUserByEmail.id != id)
        return res.status(403).json('Forbidden!');
    }

    const updatedUser = await userDao.updateUser(id, req.body);

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err.message);
  }
};

const updateStatusUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // validate request body
    if (!status) {
      return res.status(403).json('Invalid request body properties!');
    }

    // check if user exists
    const existUser = await userDao.getUserById(id);
    if (!existUser) return res.status(404).json('User not found!');

    //TODO prevent self deactivation
    // if (existUser.id == id) return res.status(403).json("Forbidden!")

    const updatedUser = await userDao.updateUser(id, status);

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err.message);
  }
};

//TODO this can be done by admins only
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // check if user exists
    const existUser = await userDao.getUserById(id);
    if (!existUser) return res.status(404).json('User not found!');

    if (existUser.role === ROLE.ADMIN) {
      return res.status(403).json('Forbidden!');
    }

    const deletedUser = await userDao.deleteUser(id);

    res.status(200).json(deletedUser);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  updateStatusUser,
  deleteUser,
};
