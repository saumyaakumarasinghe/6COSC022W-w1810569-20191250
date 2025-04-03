const jwt = require('jsonwebtoken');
const SECRET_KEY = 'w1810569-20191250'; //TODO secure this - use an environment variable for secret key in real projects

const generateToken = async (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const authenticateToken = async (token) => {
  const decoded = jwt.sign(token, SECRET_KEY);
  return decoded;
};

module.exports = {
  generateToken,
  authenticateToken,
};
