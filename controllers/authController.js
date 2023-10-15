const User = require("../model/User")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');





const handleLogin = async (req, res)=>{
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({"error":"username and password required"});
    const user = await User.findOne({username:username}).exec();

    if (!user) return res.status(401).json({"message":"invalid credentials"})
    const match = await bcrypt.compare(password, user.password)
    if (match) {
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
        
        const refreshToken = jwt.sign(
            {"username":user.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        );
        
        user.refreshToken = refreshToken;
        result = await user.save();
        res.cookie("jwt", refreshToken, {httpOnly:true, maxAge:24*60*60*1000, sameSite:'None', secure:true});
        return res.status(200).json({accessToken});

    } else{
        return res.status(401).json({"message":"invalid credentials"})
    }
};


module.exports = {handleLogin}