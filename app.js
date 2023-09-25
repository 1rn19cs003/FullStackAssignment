const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const passport = require('passport');
const authMiddleware = require('./middlware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig.js');

// Middleware and route handling
app.use(express.json());
app.use(session({ secret: 'your_secret_key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Serve the Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// app.use('/api', userRoutes);

app.use('/admin', authMiddleware.authenticateUser, authMiddleware.isAdmin);
app.use('/profile', authMiddleware.authenticateUser);
app.use('/user', authMiddleware.authenticateUser, authMiddleware.authorizeUser);
app.use('/login', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

