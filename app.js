const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig.js');
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
const secretKey = process.env.JWT_SECRET_KEY;

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
        return next(new Error('Oh no')) //handle error
    }
    next() //otherwise continue
});
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// Serve the Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
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
    console.log(`Server is running on port ${port}`);
});

