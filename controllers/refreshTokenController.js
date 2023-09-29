const usersDB = {
    users: require("../model/users.json"),
    setUsers : function (data) {
        this.users = data
    }
};
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = (req, res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);

    let refreshToken = cookies.jwt;
    
    const user = usersDB.users.find(person => person.refreshToken ===refreshToken);

    if (!user) return res.sendStatus(403);
    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded)=>{
            if (error || user.username !== decoded.username) return sendStatus(403);
            const accessToken = jwt.sign(
                {"username":user.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:"20s"}
            );
            return res.status(200).json({accessToken});
        }
    );
}   


module.exports = {handleRefreshToken};