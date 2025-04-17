const ERROR_MESSAGES = {
  API_KEY_REQUIRED: 'API key is required',
  API_KEY_INVALID: 'Invalid API key',
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',
  INVALID_REQUEST_BODY: 'Invalid request body properties',
  INVALID_REQUEST_PARAMS: 'Invalid request parameters',
  USER_NOT_AUTHORIZED: 'User not authorized',
  LOGIN_FAILED: 'Login failed',
  USER_NOT_ACTIVE: 'User not active',
  REGISTRATION_FAILED: 'Registration failed',
  FAILED_TO_FETCH_COUNTRIES: 'Failed to fetch countries',
  FAILED_TO_FETCH_API_KEY_INTERACTIONS: 'Failed to fetch api key interactions',
  FAILED_TO_FETCH_API_KEY: 'Failed to fetch API keys',
  FAILED_TO_CREATE_API_KEY: 'Failed to create API key',
  FAILED_TO_REVOKE_API_KEY: 'Failed to revoke API key',
  FAILED_TO_FETCH_API_KEY_STATS: 'Failed to fetch API key statistics',
  COUNTRY_NOT_FOUND: 'Country not found',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  SELF_DELETE_NOT_ALLOWED: 'Self deletion is not allowed!',
  SELF_DEACTIVATION_NOT_ALLOWED: 'Self deactivation is not allowed!',
  NOT_AUTHORIZED: 'Not authorized to perform this action',
};

module.exports = { ERROR_MESSAGES };
