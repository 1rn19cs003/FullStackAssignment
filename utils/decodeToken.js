const jwt = require('jsonwebtoken');

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
}

module.exports = Utils;
