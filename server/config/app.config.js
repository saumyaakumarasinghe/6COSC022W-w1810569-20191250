const express = require('express');
const dotenv = require('dotenv');
const swaggerDocs = require('./swagger.config');
const routesV1 = require('../routes/v1');
const bodyParser = require('body-parser');
const { DB } = require('./database.config');
const cors = require('cors');

// determine which env file to load
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT;

app.use(cors());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.originalUrl}`);
  next(); // Pass control to the next middleware or route handler
});

// middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.ENV !== 'production') {
  swaggerDocs(app);
}

// configure routes
app.use('/api/v1', routesV1);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
