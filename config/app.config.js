const express = require("express")
const dotenv = require("dotenv");
const swaggerDocs = require("../config/swagger.config");
const routesV1 = require("../routes/v1");

// determine which env file to load
const envFile = process.env.NODE_ENV === "production" ? ".env.prod" : ".env.dev";
dotenv.config({ path: envFile });

const app = express();
const PORT = process.env.PORT;

if (process.env.ENV !== "production") {
    swaggerDocs(app);
}

// configure routes
app.use('/api/v1', routesV1);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});