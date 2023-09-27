# FullStackAssignment
Assignment what I need to do you can find it here \
[Download PDF](https://example.com/path-to-your-pdf-file.pdf)
## Follow the steps below to create a wokring server using swager!

## Here is the Tree

```
┣ 📜.gitignore
┣ 📜app.js
┣ 📂config
 ┃ ┣ 📜database.js
 ┃ ┣ 📜swagger.config.const.js
 ┃ ┣ 📜swaggerConfig.js
┣ 📂controllers
 ┃ ┣ 📜autherBookController.js
 ┃ ┣ 📜authorController.js
 ┃ ┣ 📜bookController.js
 ┃ ┣ 📜customerController.js
 ┃ ┣ 📜orderController.js
 ┃ ┣ 📜orderItemController.js
 ┃ ┣ 📜userController.js
┣ 📜database.sql
┣ 📜index.js
┣ 📜logger.js
┣ 📂middlware
 ┃ ┣ 📜auth.js
 ┃ ┣ 📜request-logger.js
┣ 📂models
 ┃ ┣ 📜author.js
 ┃ ┣ 📜bookauthor.js
 ┃ ┣ 📜books.js
 ┃ ┣ 📜customer.js
 ┃ ┣ 📜orderItems.js
 ┃ ┣ 📜orders.js
 ┃ ┣ 📜user.js
┣ 📜now.json
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜README.md
┣ 📂routes
 ┃ ┣ 📜authorbookRoutes.js
 ┃ ┣ 📜authorRoutes.js
 ┃ ┣ 📜bookRoutes.js
 ┃ ┣ 📜customerRoutes.js
 ┃ ┣ 📜indexRoute.js
 ┃ ┣ 📜orderitemRoutes.js
 ┃ ┣ 📜orderRoutes.js
 ┃ ┣ 📜userRoutes.js
┣ 📂utils
 ┃ ┣ 📜decodeToken.js
┣ 📜vercel.json
```

## Firstly let’s create a web server:

## Navigate the cursor to the file I will create the project in the terminal and I am creating the package.json file with the following command:

```
npm init --y
```

## Now let’s add the packages that are necessary to create the server and its purpose:

- **body-parser**: Middleware for parsing HTTP request body data.

- **colors**: A library for adding color to console logs (mostly for development/debugging).

- **connect-redis**: A Redis session store for Express sessions.

- **cookie-parser**: Middleware for parsing cookies from incoming HTTP requests.

- **cookie-session**: Middleware for handling session cookies.

- **cors**: Middleware for handling Cross-Origin Resource Sharing (CORS) in Express applications.

- **dotenv**: Loads environment variables from a `.env` file into `process.env`.

- **eslint**: A tool for identifying and fixing problems in JavaScript code.

- **express**: A web framework for building web applications and APIs in Node.js.

- **express-session**: Middleware for handling sessions in Express applications.

- **fs**: The built-in Node.js file system module for interacting with the file system.

- **helmet**: A collection of middleware for securing Express apps by setting various HTTP headers.

- **jsonwebtoken**: A library for creating and verifying JSON Web Tokens (JWTs) for user authentication.

- **morgan**: Middleware for logging HTTP requests and responses in Express.

- **node**: This appears to be a placeholder or typo as it's not a valid npm package.

- **nodemon**: A utility that monitors for changes in your Node.js application and automatically restarts the server.

- **passport**: An authentication middleware for Node.js.

- **passport-local**: A Passport strategy for authenticating with a username and password.

- **pg**: A PostgreSQL client for Node.js.

- **pg-hstore**: A module for serializing and deserializing JSON data to hstore format in PostgreSQL.

- **sequelize**: An Object-Relational Mapping (ORM) library for working with SQL databases in Node.js.

- **swagger-jsdoc**: A tool for generating Swagger documentation from JSDoc comments in your code.

- **swagger-ui-express**: Middleware for serving Swagger UI to visualize and interact with your API documentation.

- **ts-node**: A TypeScript execution environment and REPL for Node.js.

- **ts-node-dev**: A TypeScript development server with fast restarts and enhanced type checking.

- **typescript**: A superset of JavaScript that adds static types to the language.

- **winston**: A logging library for Node.js applications.

- **winston-daily-rotate-file**: A transport for rotating log files daily when using the Winston logger.


To install the necessary packages, run the following commands:

```bash
npm install body-parser colors connect-redis cookie-parser
npm install cookie-session cors dotenv eslint express
npm install express-session helmet jsonwebtoken morgan
npm install passport passport-local pg pg-hstore sequelize
npm install swagger-jsdoc swagger-ui-express ts-node ts-node-dev
npm install typescript winston winston-daily-rotate-file
```


## And finally, let’s add the following code to scripts field in the package.json file.

```
"start": "nodemon index.js"
```

### If you don’t have nodemon in your PC, I advise installing it globally.

```
sudo npm install -g nodemon
```

## Adding Swagger to the project

Firstly, let’s install two modules that are necessary for documentation and user interface (UI):

```
npm install swagger-jsdoc swagger-ui-express
```

## And I am importing these two modules in the app.js file:

```JavaScript
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
```

# &#x1F34E; PS: If you have any suggestion about what can be improved please share your thoughts I would really appreciate that!

<img align="right" src="photos/Main.png" width="100%"/>&nbsp;
&nbsp;

# I have created Database schema which is very basic but the motive was to create a server which has features like Authentication , Autherisation ,  

## Nodejs server built and maintained by [Abhishek Jaiswal ](https://www.linkedin.com/in/abhishekjaiswal1308/)