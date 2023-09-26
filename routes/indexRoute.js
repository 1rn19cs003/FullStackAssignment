const express = require('express');
const router = express.Router();
const authMiddleware = require('./authMiddleware'); // Adjust the path to your middleware file

// Apply the authenticateUser middleware to protect the route
router.get('/protected-route', authMiddleware.authenticateUser, (req, res) => {
    // Route logic for the protected route
});

// Apply the authorizeUser middleware to restrict access to certain users
router.get('/user-only-route', authMiddleware.authenticateUser, authMiddleware.authorizeUser, (req, res) => {
    // Route logic for the user-only route
});

// Apply the isAdmin middleware to restrict access to administrators
router.get('/admin-only-route', authMiddleware.authenticateUser, authMiddleware.isAdmin, (req, res) => {
    // Route logic for the admin-only route
});

module.exports = router;
