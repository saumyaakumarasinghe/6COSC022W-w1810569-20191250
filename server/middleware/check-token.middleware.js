const { authenticateToken } = require('../services/token.service');

const checkAuth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(403)
      .json({ message: 'Access Denied, no token provided' });
  }

  const decoded = authenticateToken(token);
  if (!decoded)
    return res.status(401).json({ message: 'Invalid or expired token' });

  req.user = decoded;
  next(); // Pass control to the next handler
};

module.exports = {
  checkAuth,
};
