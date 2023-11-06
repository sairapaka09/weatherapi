const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger/swagger-output.json')
const port = 3000
const routeController = require("./router.js") 

app.use(express.json());
app.use("/",routeController); 

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.listen(port, () => {
  console.log(`Weather service app listening on port ${port}`)
})

module.exports = app;