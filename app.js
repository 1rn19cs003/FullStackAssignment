const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const logger = require('./logger');
const logRequest = require('./middlware/request-logger');

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
const host = process.env.HOST ||'ec2-34-238-39-43.compute-1.amazonaws.com';
// const host = process.env.HOST ||'localhost' ||'ec2-34-238-39-43.compute-1.amazonaws.com';
const secretKey = process.env.JWT_SECRET_KEY;


// const allowedOrigins =  // Add your allowed origins
// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.includes(origin) || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
// };


// Middleware and route handling
app.set('trust proxy', 1);
// app.use(cors(corsOptions));
app.use(cors({
    origin: ['http://ec2-34-238-39-43.compute-1.amazonaws.com:3000/', 'http://localhost:300'], // Replace with your frontend's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Include this if you're using cookies or sessions
}));
app.use(logRequest);
app.use(express.json());
app.use(session({
    keys: ['abhishek'],
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


app.use('/api-docs/', swaggerRouter);
app.use('/', userRoutes);
app.use('/books/', Utils.authenticateJWT, authMiddleware.authenticateUser, bookRoutes);
app.use('/authors/', Utils.authenticateJWT, authMiddleware.authenticateUser, authorRoutes);
app.use('/customers/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, customerRoutes);
app.use('/orders/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, orderRoutes);
app.use('/orderitems/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, orderitemRoutes);
app.use('/authorbooks/', Utils.authenticateJWT, authMiddleware.authenticateUser, authMiddleware.authorizeUser, authorbookRoutes);



app.listen(port, () => {
    console.log(`Server running on http://${host}:${port}`);
});

