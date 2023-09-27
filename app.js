const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');


const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

// const swaggerSpec = require('./config/swaggerConfig.js');
const app = express();



const userRoutes = require('./routes/userRoutes');
const bookRoutes=require('./routes/bookRoutes.js');
const authorRoutes=require('./routes/authorRoutes.js');
const customerRoutes = require('./routes/customerRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const orderitemRoutes = require('./routes/orderitemRoutes.js');
const authorbookRoutes = require('./routes/authorbookRoutes.js');
const passport = require('passport');
const Utils = require('./utils/decodeToken');
const authMiddleware = require('./middlware/auth');


const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const secretKey = process.env.JWT_SECRET_KEY;

const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";


// Middleware and route handling
app.set('trust proxy', 1);
app.use(express.json());
app.use(session({ 
    cookie: { 
        secure: true ,
        maxAge: 60000
    } ,
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
}));


app.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error('Error')) //handle error
    }
    next() //otherwise continue
});
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// Serve the Swagger documentation
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

const specs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { customCssUrl:CSS_URL}));
app.use('/', userRoutes);
app.use('/books/', Utils.authenticateJWT, authMiddleware.authenticateUser, bookRoutes);
app.use('/authors/', Utils.authenticateJWT, authMiddleware.authenticateUser,authorRoutes);
app.use('/customers/', Utils.authenticateJWT, authMiddleware.authenticateUser,customerRoutes);
app.use('/orders/', Utils.authenticateJWT, authMiddleware.authenticateUser,orderRoutes);
app.use('/orderitems/', Utils.authenticateJWT, authMiddleware.authenticateUser,orderitemRoutes);
app.use('/authorbooks/', Utils.authenticateJWT, authMiddleware.authenticateUser,authorbookRoutes);



// app.use('/admin', authMiddleware.authenticateUser, authMiddleware.isAdmin);
// app.use('/profile', authMiddleware.authenticateUser);
// app.use('/user', authMiddleware.authenticateUser, authMiddleware.authorizeUser);


app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
});

