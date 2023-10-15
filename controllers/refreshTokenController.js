const User = require("../model/User")
const jwt = require('jsonwebtoken');


const handleRefreshToken = async  (req, res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);

    let refreshToken = cookies.jwt;
    
    const user = await User.findOne({ refreshToken }).exec();

    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded)=>{
            if (error || user.username !== decoded.username) return sendStatus(403);
            const roles = Object.values(user.roles)
            const accessToken = jwt.sign(
                {"userInfo":{ 
                    "username":user.username,
                    "roles":roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"1m"}
            );
            return res.status(200).json({accessToken});
        }
    );
}   


module.exports = {handleRefreshToken};