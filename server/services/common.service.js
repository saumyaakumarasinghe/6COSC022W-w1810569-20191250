const healthCheck = async (req, res) => {
  return res.status(200).json({
    status: 'ok',
    message: 'Service is running',
    version: process.env.npm_package_version || '1.0.0',
    timestamp: new Date().toISOString(),
  });
};

const fallback = async (req, res) => {
  return res.status(404).json('Route not found');
};

module.exports = {
  healthCheck,
  fallback,
};
