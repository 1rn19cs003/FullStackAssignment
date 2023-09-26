const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
        },
    },
    // List of files to be processed. You can include all your API routes here.
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// console.log(swaggerSpec);

module.exports = swaggerSpec;
