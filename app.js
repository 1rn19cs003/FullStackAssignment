const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const logger = require('./logger');
const logRequest = require('./middlware/request-logger');

const swaggerUi = require('swagger-ui-express');

const specs = require('./config/swaggerConfig.js');
const app = express();
const swaggerRouter = require('./config/swagger.config.const');


const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes.js');
const authorRoutes = require('./routes/authorRoutes.js');
const customerRoutes = require('./routes/customerRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const orderitemRoutes = require('./routes/orderitemRoutes.js');
const authorbookRoutes = require('./routes/authorbookRoutes.js');
const passport = require('passport');
const Utils = require('./utils/decodeToken');
const authMiddleware = require('./middlware/auth');
const cors = require('cors');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const secretKey = process.env.JWT_SECRET_KEY;


const allowedOrigins = ['https://full-stack-assignment-git-master-1rn19cs003.vercel.app', 'http://localhost:3000']; // Add your allowed origins
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";


// Middleware and route handling
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(logRequest);
app.use(express.json());
app.use(session({
    cookie: {
        secure: true,
        maxAge: 60000
    },
    secret: secretKey,
    resave: true,
    saveUninitialized: true,
}));


app.use(function (req, res, next) {
    logger.info('Request received at /');
    if (!req.session) {
        return next(new Error('Error')) //handle error
    }
    next() //otherwise continue
});
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// Serve the Swagger documentation
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
//                 email: "abhigrmr@gmail.com",
//             },
//         },
//     },
//     // This is to call all the file
//     apis: ['./routes/*.js'],
// };

// const specs = swaggerJsDoc(options);
// app.use('/api-docs/', swaggerUi.serve, swaggerUi.setup(specs, { customCssUrl: CSS_URL }));
app.use('/api-docs/', swaggerRouter);
app.use('/', userRoutes);
app.use('/books/', Utils.authenticateJWT, authMiddleware.authenticateUser, bookRoutes);
app.use('/authors/', Utils.authenticateJWT, authMiddleware.authenticateUser, authorRoutes);
app.use('/customers/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, customerRoutes);
app.use('/orders/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, orderRoutes);
app.use('/orderitems/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, orderitemRoutes);
app.use('/authorbooks/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, authorbookRoutes);



// app.use('/admin', authMiddleware.authenticateUser, authMiddleware.isAdmin);
// app.use('/profile', authMiddleware.authenticateUser);
// app.use('/user', authMiddleware.authenticateUser, authMiddleware.authorizeUser);


app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
});

