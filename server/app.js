const express = require('express');
const dotenv = require('dotenv');
const routesV1 = require('./routes/v1');
const commonRoutes = require('./routes/common.routes');
const bodyParser = require('body-parser');
const db = require('./database/connection');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger.docs');

// Determine which env file to load
const envFile = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return '.env.prod';
    case 'test':
      return '.env.test';
    default:
      return '.env.dev';
  }
})();
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT || 8000; // Default to port 8000 if PORT is not set

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Swagger setup
if (process.env.NODE_ENV !== 'production') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
}

// Configure routes
app.use('/api/v1', routesV1);
app.use('/api', commonRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  }
});
