
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const router = express.Router();

const SWAGGER_OPTIONS = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "FullStack Assignment",
            version: "0.1.0",
            description: "This document provides API endpoints for PlacXpert",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "BookManagement",
                url: "https://www.linkedin.com/in/abhishekjaiswal1308/",
                email: "abhigrmr@gmail.com",
            },
        },
    },
    apis: ["./routes/*.js"],
};


const specs = swaggerJsdoc(SWAGGER_OPTIONS);

router.use("/", swaggerUi.serve);
router.get("/", swaggerUi.setup(specs, { customCssUrl: CSS_URL }));



module.exports = router;