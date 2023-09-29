const usersDB = {
    users: require("../model/users.json"),
    setUsers : function (data) {
        this.users = data
    }
};
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogout = (req, res)=>{
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204);

    let refreshToken = cookies.jwt;
    
    const user = usersDB.users.find(person => person.refreshToken ===refreshToken);
    if (!user) {
        res.clearCookie("jwt", {httpOnly:true, sameSite:None, secure:true});
        res.sendStatus(204);
    };
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== user.refreshToken);
        const currentUser = {...user, refreshToken:""};
        usersDB.setUsers([...otherUsers, currentUser]);
        fsPromises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(usersDB.users)
        );
        res.clearCookie("jwt", {httpOnly:true, sameSite:None, secure:true}); //in production, when setting the cookies in login always set secure: true so that it sennds over https
        return res.sendStatus(204);

}   


module.exports = {handleLogout};