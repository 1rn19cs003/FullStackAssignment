// Import the 'swagger-jsdoc' library to generate Swagger documentation.
const swaggerJsdoc = require('swagger-jsdoc');

// Define Swagger options for generating API documentation.
const options = {
    // Define the API information.
    definition: {
        openapi: "3.0.0", // Specify the OpenAPI version.
        info: {
            title: "Library API", // API title.
            version: "1.0.0", // API version.
            description: "A simple Express Library API", // API description.
            termsOfService: "http://example.com/terms/", // Terms of service URL.
            contact: {
                name: "Abhishek Jaiswal", // Contact name.
                url: "https://www.linkedin.com/in/abhishekjaiswal1308/", // Contact URL.
                email: "abhigrmr@gmail.com", // Contact email.
            },
        },
        // Define the server where the API documentation is hosted.
        servers: [
            {
                url: "https://full-stack-assignment-gamma.vercel.app/", // Base URL of the API.
                description: "My API Documentation", // Description of the server.
            },
        ],
    },
    // Specify the files to scan for API endpoints.
    apis: ['./routes/*.js'], // Scan all JavaScript files in the 'routes' directory.
};

// Generate the Swagger specification using the defined options.
const swaggerSpec = swaggerJsdoc(options);

// Export the Swagger specification for use in the application.
module.exports = swaggerSpec;
