const express = require('express')
const app = express()
const router = express.Router()
const weatherApi = require('./weatherapi')
const swagger = require('./swagger')
const port = 3000

app.use(express.json());
app.use('/getweatherdata', weatherApi.getCurrentWeather);

router.get("/getweatherdata", weatherApi.getCurrentWeather);

swagger(app);

app.listen(port, () => {
  console.log(`Weather service app listening on port ${port}`)
})