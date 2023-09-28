const logger = require('../logger') // Import the logger module
function logRequest(req, res, next) {
    // Log the request URL and method
    logger.request(`${req.method} ${req.originalUrl}`);

    // Log request headers (optional)
    logger.debug('Request Headers:', req.headers);

    // Capture the start time of the request
    const startTime = new Date();

    // Capture the response end method to log response details
    const end = res.end;
    res.end = function (chunk, encoding) {
        // Log the response status code
        logger.response(`Status Code: ${res.statusCode}`);

        // Log response headers (optional)
        logger.debug('Response Headers:', res.getHeaders());

        // Calculate the response time
        const responseTime = new Date() - startTime;

        // Log the response time
        logger.request(`Response Time: ${responseTime}ms`);

        // Call the original response end method
        res.end = end;
        res.end(chunk, encoding);
    };

    next();
}

module.exports = logRequest;
