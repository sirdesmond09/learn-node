const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return  res.status(403).json({"error":"authentication credentials were not provided"}) 
    console.log(authHeader);

    token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, 
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {
            if (error) return res.status(403).json({"error":"invalid token"});
            req.user = decoded.username;
            next();
        }
        )

};


module.exports = verifyJWT;