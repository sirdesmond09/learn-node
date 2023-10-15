const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer ')) return  res.status(403).json({"error":"authentication credentials were not provided"}) 

    token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, 
        process.env.ACCESS_TOKEN_SECRET,
        (error, decoded) => {

            if (error) return res.status(403).json({"error":"invalid token"});
            req.user = decoded.userInfo.username;
            req.roles = decoded.userInfo.roles;
            next();
        }
        )

};


module.exports = verifyJWT;