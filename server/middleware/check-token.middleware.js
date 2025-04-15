const { STATUS_CODES } = require('../constants/status-code.constants');
const { authenticateToken } = require('../services/token.service');

const checkAuth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ message: 'Access Denied, no token provided' });
  }

  const decoded = authenticateToken(token);
  if (!decoded)
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: 'Invalid or expired token' });

  req.user = decoded;
  next(); // Pass control to the next handler
};

module.exports = {
  checkAuth,
};
