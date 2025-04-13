const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for your project.',
    },
    servers: [
      {
        url: 'http://localhost:8000', // Ensure this matches your server's base URL
      },
    ],
  },
  apis: ['./docs/api/*.yaml'], // Ensure this path matches your YAML files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
