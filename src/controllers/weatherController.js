
const fetch = require('node-fetch');
const httpCodes = require('http-codes');
const enums = require('../enums/weather');
const config = require('../config/weather');
const model = require('../models/weather').getWeatherData;
const validator = require('../validations/validator');

/**
 * Get current weather
 * @param  {input} Object Incoming query data
 * @return {response} Object
 */
getCurrentWeather = async (input) => {
  let response = {};
  try {
    model.input = {
      latitude: input.lat,
      longitude: input.long,
      filter: JSON.parse(input.filter)
    }

    const validationResult = validator.validate(model.input);
    if (validationResult.length > 0) {
      response = {
        success: false,
        errors: validationResult
      }
      return response;
    }

    let url = config.url;
    if (Object.keys(model.input.filter).length > 0) {
      let options = '';
      Object.entries(model.input.filter).forEach(([key, value]) => {
        options = options.concat(`&${key}=${value}`);
      });
      url = url.concat(`?lat=${model.input.latitude}&lon=${model.input.longitude}${options}`);
    } else {
      url = url.concat(`?lat=${model.input.latitude}&lon=${model.input.longitude}&appid=${config.key}`);
    }
    url = url.concat(`&appid=${config.key}`);

    const thirdPartyRes = await fetch(url);
    const jsonData = await thirdPartyRes.json();
    model.output = {
      success: true,
      data: {
        currentWeatherState: jsonData.current.weather[0].description,
        timeZone: jsonData.timezone,
        temperature: `${jsonData.current.temp} Celsius`,
        feelsLike: `${jsonData.current.feels_like} Celsius`,
        humidity: `${jsonData.current.humidity} %`,
        isWindy: jsonData.current.wind_speed > 10 ? true : false,
        visibilityCondition: jsonData.current.visibility > 1000 ? 'Good' : 'Poor'
      }
    }
    return model.output;
  }
  catch (error) {
    if (error.statuscode) {
      response = {
        success: false,
        statusCode: error.statuscode,
        error: error.message
      };
    }
    response = {
      success: false,
      statusCode: httpCodes.INTERNAL_SERVER_ERROR,
      error: error.message
    };
    return response;
  }
}

module.exports = {
  getCurrentWeather
}