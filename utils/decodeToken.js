const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY||'abhishek';
class Utils {
    static async decodeToken(tokenToVerify, secretKey) {
        try {
            return new Promise((resolve, reject) => {
                jwt.verify(tokenToVerify, secretKey, (err, decoded) => {
                    if (err) {
                        // Token is invalid or has expired
                        console.error('JWT verification failed:', err);
                        reject(err);
                    } else {
                        resolve(decoded);
                    }
                });
            });
        } catch (error) {
            console.error('An error occurred:', error);
            throw error; // Re-throw the error to propagate it
        }
    }

    static async authenticateJWT(req, res, next) {
        try {
            // console.log(req.session);
            // console.log(req.rawHeaders[authToken]);
            console.log(req.cookies);
            const token = req.cookies.authToken; // Assuming you store the token in a cookie
            if (!token) {
                return res.status(401).json({ message: 'Authentication required' });
            }

            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
                req.user = user; // Set the user information in the request object
                next(); // Proceed to the next middleware
            });
        } catch (error) {
            console.error('An error occurred:', error);
            throw error; // Re-throw the error to propagate it
        }

    }

    static async validateEmail(email){
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

}

module.exports = Utils;
