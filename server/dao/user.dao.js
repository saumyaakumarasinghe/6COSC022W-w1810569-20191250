const { User } = require('../models/index');

async function createUser(firstName, lastName, email, mobile, password, role) {
  try {
    return User.create({
      firstName,
      lastName,
      email,
      mobile,
      password,
      role,
      lastActivateAt: Date.now(),
      status: true,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    return User.findAll();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    return User.findOne({
      where: { id: userId },
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    return User.findOne({
      where: { email },
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

async function updateUser(userId, userData) {
  try {
    await User.update(userData, { where: { id: userId } });

    return await getUserById(userId);
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

async function deleteUser(userId) {
  try {
    return await User.destroy({ where: { id: userId } });
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
};
