const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    let origin = req.headers.origin;
    if (allowedOrigins.include(origin)){
        res.header('Access-Control-Allow-Credentials', true);
    }
    next();
}

module.exports = credentials;