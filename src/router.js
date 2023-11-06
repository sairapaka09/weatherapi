const express = require("express");
const router = express.Router();
const authenticator = require('../src/middleware/authentication').authenticateToken;
const weatherApi = require('../src/controllers/weatherController');
const validator = require('./middleware/validation-middleware').validateInput;

router.route("/getweatherdata").get(validator, authenticator, (req, res) => {
    // #swagger.responses[200] = { schema: { $success: "true", $data: { $coordinatesLocation: "DFW, TX", $currentWeatherState: "Rainy", $timeZone: "EST/GMT", $temperature: "15.6", $feelsLike: "10", $humidity: "100", $isWindy: "yes", $visibilityCondition: "clear" } } , description: "Success" }
    // #swagger.responses[400] = { schema: { $success: "false", $errors: [ { $message: "Invalid latitude value", $statusCode: "400" } ] } ,description: "Invalid data" }
    // #swagger.responses[500] = { schema: { $success: "false", $error: "Unable to get data from thirdparty api." } ,description: "Server error." }
    /*  #swagger.parameters['lat'] = {
                    in: 'query',
                    description: 'latitude',
                    required: true
            } */
    /*  #swagger.parameters['long'] = {
            in: 'query',
            description: 'longitude',
            required: true
    } */
    /*  #swagger.parameters['filter'] = {
            in: 'query',
            description: 'filter',
            required: false
    } */
    weatherApi.getCurrentWeather(req.query).then((response) => res.send(response));
});

module.exports = router
