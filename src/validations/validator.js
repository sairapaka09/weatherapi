
const httpCodes = require('http-codes');
const enums = require('../enums/weather');

function validate(input) {
    let errors = [];
    if (!isLatitude(input.latitude)) {
        const error = {
            message: 'Invalid latitude value',
            statusCode: httpCodes.BAD_REQUEST
        }
        errors.push(error);
    }
    else if (!isLongitude(input.longitude)) {
        const error = {
            message: 'Invalid longitude value',
            statusCode: httpCodes.BAD_REQUEST
        }
        errors.push(error);
    }
    else if(input.filter.length > 0 && !enums.metrics.includes(input.filter.units)){
        const error = {
            message: 'Invalid unit value',
            statusCode: httpCodes.BAD_REQUEST
        }
        errors.push(error);
    }
    return errors;
}

function isLatitude(val) {
    var latF = parseFloat(val)
    if (isNaN(latF)) return false
    return (latF >= -90 && latF <= 90)
  }
  function isLongitude(val) {
    var lonF = parseFloat(val)
    if (isNaN(lonF)) return false
    return lonF >= -180 && lonF <= 180
  }

module.exports = {
    validate
}