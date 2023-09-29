const usersDB = {
    users: require("../model/users.json"),
    setUsers : function (data) {
        this.users = data
    }
};
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

require('dotenv').config();
const fsPromises = require("fs").promises;
const path =  require('path')




const handleLogin = async (req, res)=>{
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({"error":"username and password required"});
    const user = usersDB.users.find(person => person.username ===username);

    if (!user) return res.status(401).json({"message":"invalid credentials"})
    const match = await bcrypt.compare(password, user.password)
    if (match) {
        const accessToken = jwt.sign(
            {"username":user.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"20s"}
        );
        
        const refreshToken = jwt.sign(
            {"username":user.username},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:"1d"}
        );

        const otherUsers = usersDB.users.filter(person => person.username !== user.username);
        const currentUser = {...user, refreshToken};
        usersDB.setUsers([...otherUsers, currentUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        );
        res.cookie("jwt", refreshToken, {httpOnly:true, maxAge:24*60*60*1000, sameSite:None, secure:true});
        return res.status(200).json({accessToken});

    } else{
        return res.status(401).json({"message":"invalid credentials"})
    }
};


module.exports = {handleLogin}