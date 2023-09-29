const usersDB = {
    users: require("../model/users.json"),
    setUsers : function (data) {
        this.users = data
    }
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require("bcrypt");
const { json } = require("express");

const handleNewUser = async (req, res)=>{
    const {username, password} = req.body;
    if (!username || !password) return res.status(400).json({"error":"username and password required"});
    const duplicate = usersDB.users.find(person => person.username ===username);
    if (duplicate) return res.status(409).json({"error":"username already exist"});

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = {"username":username,
                        "password":hashedPwd};
        usersDB.setUsers([...usersDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);

        res.status(201).json({"message":`new user ${username} created`})
    } catch (error) {
        res.status(500).json({"error":error.message})
    }
};


module.exports = {handleNewUser}