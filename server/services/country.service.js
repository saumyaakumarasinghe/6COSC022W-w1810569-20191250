const axios = require('axios');
const { STATUS_CODES } = require('../constants/status-code.constants');

async function getCountryByName(req, res) {
  try {
    const { countryName } = req.params;
    if (!countryName) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json('Country name is required');
    }

    const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`;

    const response = await axios.get(url);
    const country = response.data[0];

    const payload = {
      name: country.name.common,
      capital: country.capital ? country.capital[0] : 'N/A',
      currencies: country.currencies ? Object.keys(country.currencies) : [],
      languages: country.languages ? Object.values(country.languages) : [],
      flag: country.flags?.svg || country.flags?.png || 'N/A',
    };
    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json('Country not found or API error');
  }
}

async function getAllCountries(req, res) {
  try {
    const url = 'https://restcountries.com/v3.1/all';
    const response = await axios.get(url);

    const payload = response.data.map((country) => ({
      name: country.name?.common || 'N/A',
      capital: country.capital ? country.capital[0] : 'N/A',
      currencies: country.currencies ? Object.keys(country.currencies) : [],
      languages: country.languages ? Object.values(country.languages) : [],
      flag: country.flags?.svg || country.flags?.png || 'N/A',
    }));

    res.status(STATUS_CODES.OK).json(payload);
  } catch (err) {
    console.log(err.message);
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json('Failed to fetch countries');
  }
}

module.exports = { getCountryByName, getAllCountries };
