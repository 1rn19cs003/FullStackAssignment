const swaggerJsdoc = require('swagger-jsdoc');

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
                email: "abhigrmr@gmail.com",
            },
        },
        servers: [
            {
                url: "https://full-stack-assignment-gamma.vercel.app/",
                description: "My API Documentation",
            },
        ],
    },
    // This is to call all the file
    apis: ['./routes/*.js'],
};
// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Your API Documentation',
//             version: '1.0.0',
//             description: 'API documentation for your Node.js application',
//         },
//     },
//     // List of files to be processed. You can include all your API routes here.
//     apis: ['./routes/*.js'],
// };

const swaggerSpec = swaggerJsdoc(options);

// console.log(swaggerSpec);

module.exports = swaggerSpec;
