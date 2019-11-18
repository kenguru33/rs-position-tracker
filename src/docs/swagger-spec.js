const swaggerJsDoc = require('swagger-jsdoc')

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RS Position Tracker',
      version: '1.0.0'
    }
  },
  apis: ['src/routes/api-router.js']
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJsDoc(swaggerOptions)

module.exports = swaggerSpec