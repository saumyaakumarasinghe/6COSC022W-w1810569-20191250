const apiKeyDao = require('../dao/api-key.dao');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const getApiKeysList = async (req, res) => {
  try {
    const apiKeys = await apiKeyDao.getAllApiKeys();

    const apiKeyList = apiKeys.map(({ id, key }) => ({ id, key }));

    res.status(STATUS_CODES.OK).json(apiKeyList);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_API_KEY);
  }
};

module.exports = {
  getApiKeysList,
};
