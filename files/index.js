const fs = require('fs')

// fs.readFile("files/starter.txt", "utf-8",(err, data) => {
//     if (err) throw err;
//     // console.log(data.toString());
//     console.log(data);
// })

const path = require("path")
fs.readFile(path.join(__dirname, "starter.txt"), "utf-8",(err, data) => {
    if (err) throw err;
    // console.log(data.toString());
    console.log(data);
})

console.log("hello...")


process.on("uncaughtException", err => {
    console.error(`There was an uncaught error ${err}`)
})