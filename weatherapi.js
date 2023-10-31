
const fetch = require('node-fetch');
const httpCodes = require('http-codes');

/**
 * @swagger
 * /getweatherdata:
 *   get:
 *     description:  get current weather data
 *     parameters:
 *       - in: query
 *         name: lat
 *         type: string
 *         required: true
 *         description: latitude value
 *       - in: query
 *         name: long
 *         type: string
 *         required: true
 *         description: longitude value
 *     responses:
 *       200:
 *         description: Found weather data
 *       404:
 *         description: Location not found
 *       500:
 *         description: Internal server error
 */
module.exports.getCurrentWeather = async (req, res) => {
  try {
    const latitude = req.query.lat;
    const longitude = req.query.long;
    if (isNaN(latitude) || isNaN(longitude)) {
      return(res.send({
        status: httpCodes.BAD_REQUEST,
        data: {}
      }));
    } else {
      const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily,minutely&appid=61782f5a135cbb22a767f4eec8442e9b&units=metric`
      const response = await fetch(url);
      const data = await response.json();
      const currentState = data.current.weather[0].main
      // console.log(data)
      return(res.send({
        status: httpCodes.OK,
        currentState: currentState,
        data: data
      }));
    }
  }
  catch (error) {
    return(res.send({
      status: httpCodes.INTERNAL_SERVER_ERROR,
      data: {}
    }));
  }
}
