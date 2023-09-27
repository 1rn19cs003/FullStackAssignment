// // const express = require("express");
// const express = require('express');
// const cors = require("cors");
// const morgan = require("morgan");
// const dotenv = require("dotenv");
// const swaggerUI = require("swagger-ui-express");
// const swaggerJsDoc = require("swagger-jsdoc");
// const bodyParser = require("body-parser");

// // Import the router from the hello.js file
// const userRoutes = require('./routes/userRoutes');

// // CDN CSS

// const CSS_URL =
//     "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

// const app = express();

// app.use(bodyParser.json()); // to use body object in requests
// const PORT = process.env.PORT || 2001;
// dotenv.config();

// app.use(morgan("dev"));
// app.use(cors());

// const options = {
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "Library API",
//             version: "1.0.0",
//             description: "A simple Express Library API",
//             termsOfService: "http://example.com/terms/",
//             contact: {
//                 name: "API Support",
//                 url: "http://www.exmaple.com/support",
//                 email: "support@example.com",
//             },
//         },
//     },
//     // This is to call all the file
//     apis: ['./routes/*.js'],
// };

// const specs = swaggerJsDoc(options);
// // app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// app.use(
//     "/api-docs",
//     swaggerUI.serve,
//     swaggerUI.setup(specs, { customCssUrl: CSS_URL })
// );

// // Here we are calling the basic html
// // Use the router from the hello.js file
// // Use the router from the post.js file
// app.use('/', userRoutes);

// app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));

const fs = require('fs');
const path = require('path');

function generateFolderStructure(rootDir, indent = '') {
    const files = fs.readdirSync(rootDir);

    let structure = '';
    for (const file of files) {
        list = ['.babelrc', '.env', '.git', 'node_modules','logs'];
        // console.log(file);
        if (list.includes(file)) {
            // console.log(file);
            continue;
        }
        // if (file === 'node_modules') {
        // Skip the "node_modules" directory
        // }

        const filePath = path.join(rootDir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // If it's a directory, recursively generate its structure
            structure += `${indent}┣ 📂${file}\n`;
            structure += generateFolderStructure(filePath, `${indent} ┃ `);
        } else {
            // If it's a file, add it to the structure
            structure += `${indent}┣ 📜${file}\n`;
        }
    }

    return structure;
}

// Define the root directory of your project
const projectRoot = path.join(__dirname);

// Generate the folder structure
const folderStructure = generateFolderStructure(projectRoot);

// Output the folder structure to the console or save it to a file
console.log(folderStructure);

