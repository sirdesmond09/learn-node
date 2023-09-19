const logEvents = require("./logEvent");


const EventEmitter = require("events")


class MyEmitter extends EventEmitter {};


// initialize the objeect

const myEmitter = new MyEmitter();

//add listener for the event

myEmitter.on("log", (msg) => logEvents(msg));


setTimeout(() => {
    //emit the event

    myEmitter.emit("log", "Log event emitted!");
}, 2000);




