
exports.authenticateUser = (req, res, next) => {
    console.log(req.session);
    // Check if the user is authenticated (e.g., by checking if a user session exists).
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, proceed to the next middleware.
    }
    res.status(401).json({ message: 'Authentication required',});
};

// Authorization middleware
exports.authorizeUser = (req, res, next) => {
    // Check if the authenticated user has the necessary permissions (e.g., based on user roles).
    if (req.user && req.user.role === 'user') {
        return next(); // User has the necessary permissions, proceed to the next middleware.
    }
    res.status(403).json({ message: 'Unauthorized' });
};

// Admin access control middleware
exports.isAdmin = (req, res, next) => {
    // Check if the authenticated user is an admin.
    if (req.user && req.user.role === 'admin') {
        
        return next(); // User is an admin, proceed to the next middleware.
    }
    res.status(403).json({ message: 'Admin access required',request:req });
};
