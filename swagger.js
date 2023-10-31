const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  swaggerDefinition: {
    restapi: '3.0.0',
    info: {
      title: 'Weather API',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./weatherapi.js']
}

const specs = swaggerJsdoc(options)

module.exports = (app) => {
  app.use('/api', swaggerUi.serve, swaggerUi.setup(specs))
}