const apiKeyInteractionDao = require('../dao/api-key-interaction.dao');
const { STATUS_CODES } = require('../constants/status-code.constants');
const { ERROR_MESSAGES } = require('../constants/error.constants');

const getAllApiKeyInteractions = async (req, res) => {
  try {
    const interactions = await apiKeyInteractionDao.getAllApiKeyInteractions();

    res.status(STATUS_CODES.OK).json(interactions);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_API_KEY_INTERACTIONS);
  }
};

const getApiKeyInteractionByApiKeyId = async (req, res) => {
  try {
    const { id } = req.params;

    const interaction =
      await apiKeyInteractionDao.getApiKeyInteractionByApiKeyId(id);

    res.status(STATUS_CODES.OK).json(interaction);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json(ERROR_MESSAGES.FAILED_TO_FETCH_API_KEY_INTERACTIONS);
  }
};

module.exports = {
  getAllApiKeyInteractions,
  getApiKeyInteractionByApiKeyId,
};
