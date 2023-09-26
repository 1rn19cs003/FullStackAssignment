const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig.js');
const app = express();


const userRoutes = require('./routes/userRoutes');
const indexRoutes=require('./routes/indexRoute.js');
const passport = require('passport');
const authMiddleware = require('./middlware/auth');


const port = process.env.PORT || 3000;
const secretKey = process.env.JWT_SECRET_KEY;

// Middleware and route handling
app.use(express.json());
app.use(session({ secret: secretKey, resave: true, saveUninitialized: true, cookie: { secure: false } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// Serve the Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', userRoutes);
// app.use('/login', indexRoutes);


// app.use('/admin', authMiddleware.authenticateUser, authMiddleware.isAdmin);
// app.use('/profile', authMiddleware.authenticateUser);
// app.use('/user', authMiddleware.authenticateUser, authMiddleware.authorizeUser);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

