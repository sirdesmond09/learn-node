const User = require("../model/User")
const bcrypt = require("bcrypt");


const handleNewUser = async (req, res)=>{
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({"error":"username and password required"});
    const duplicate = await User.findOne({username:username}).exec();
    if (duplicate) return res.status(409).json({"error":"username already exist"});

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const result = await User.create({
            "username":username,
            "password":hashedPwd,
        });
        console.log(result);
        res.status(201).json({"message":`new user ${username} created`})
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
};


module.exports = {handleNewUser}