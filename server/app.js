const express = require('express');
const dotenv = require('dotenv');
const routesV1 = require('./routes/v1');
const commonRoutes = require('./routes/common.routes');
const bodyParser = require('body-parser');
const db = require('./database/connection');

// determine which env file to load
const envFile =
  process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev';
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT;

// middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// if (process.env.ENV !== "production") {
//     swaggerDocs(app);
// }

// configure routes
app.use('/api/v1', routesV1);
app.use('/api', commonRoutes);

// start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
