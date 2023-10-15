const User = require("../model/User")

const handleLogout = async (req, res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204);

    let refreshToken = cookies.jwt;
    
    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie("jwt", {httpOnly:true, sameSite:'None', secure:true});
        res.sendStatus(204);
    };
    user.refreshToken = "";
    result = await user.save();
    res.clearCookie("jwt", {httpOnly:true, sameSite:'None', secure:true}); //in production, when setting the cookies in login always set secure: true so that it sennds over https
    return res.sendStatus(204);

}   


module.exports = {handleLogout};