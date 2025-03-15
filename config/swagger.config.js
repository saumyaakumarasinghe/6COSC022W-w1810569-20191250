const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "6COSC022W Coursework 1",
            version: "1.0.0",
            description: "API documentation 6COSC022W Coursework 1 (2024/25)",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ["./routes/v1/*.js"], // path to route files
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    console.log(`📄 Swagger Docs available at http://localhost:${process.env.PORT}/api-docs`);
};

module.exports = swaggerDocs;
