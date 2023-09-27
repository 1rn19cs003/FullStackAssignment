const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");

// Import the router from the hello.js file
const userRoutes = require('./routes/userRoutes');

// CDN CSS

const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const app = express();

app.use(bodyParser.json()); // to use body object in requests
const PORT = process.env.PORT || 2001;
dotenv.config();

app.use(morgan("dev"));
app.use(cors());

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
            termsOfService: "http://example.com/terms/",
            contact: {
                name: "API Support",
                url: "http://www.exmaple.com/support",
                email: "support@example.com",
            },
        },
        servers: [
            {
                url: "https://nodejs-swagger-api.vercel.app/",
                description: "My API Documentation",
            },
        ],
    },
    // This is to call all the file
    apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

// Here we are calling the basic html
// Use the router from the hello.js file
// Use the router from the post.js file
app.use('/', userRoutes);

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
