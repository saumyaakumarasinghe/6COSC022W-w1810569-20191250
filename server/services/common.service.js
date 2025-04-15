const healthCheck = async (req, res) => {
  return res.status(404).json({
    status: 'ok',
    message: 'Service is running',
  });
  //TODO add version and other details
};

const fallback = async (req, res) => {
  return res.status(404).json('Route not found');
};

module.exports = {
  healthCheck,
  fallback,
};
