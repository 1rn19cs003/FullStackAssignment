const Utils = require("../utils/decodeToken");
const secretKey = process.env.JWT_SECRET_KEY;
exports.authenticateUser = async (req, res, next) => {
    // Check if the user is authenticated (e.g., by checking if a user session exists).
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware.
    }
    res.status(401).json({ message: 'Authentication required',});
};

// Authorization middleware
exports.authorizeUser = async (req, res, next) => {
    const token = req.cookies.authToken;
    const userInformation = await Utils.decodeToken(token, secretKey);
    // Check if the authenticated user has the necessary permissions (e.g., based on user roles).
    if (userInformation && userInformation.role === 'customer') {
        return next(); // User has the necessary permissions, proceed to the next middleware.
    }
    res.status(403).json({ message: 'Unauthorized' });
};

// Admin access control middleware
exports.isAdmin = async (req, res, next) => {
    const token = req.cookies.authToken;
    const userInformation = await Utils.decodeToken(token, secretKey);
    // Check if the authenticated user is an admin.
    if (userInformation && userInformation.role === 'admin') {
        return next(); // User is an admin, proceed to the next middleware.
    }
    res.status(403).json({ message: 'Admin access required' });
};
