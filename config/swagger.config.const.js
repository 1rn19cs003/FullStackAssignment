// const apis = process.env.NODE_ENV === 'dev' ? `./routes/**.ts` : `${__dirname}/routes/**.js`;



const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

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
router.get("/", swaggerUi.setup(specs));



module.exports =router;