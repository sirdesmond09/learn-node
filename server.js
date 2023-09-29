const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require("./config/corsOptions");
const credentials  = require("./middleware/credentials");
const {logger} = require('./middleware/logEvent');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT  = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3500;

////MIDDLEWARE

//custom logger middleware
app.use(logger);

app.use(credentials)
app.use(cors(corsOptions));

// Built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use("/", express.static(path.join(__dirname, '/public')));
//cookies middleware
app.use(cookieParser());

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/apis/register'));
app.use('/login', require('./routes/apis/auth'));
app.use('/refresh', require('./routes/apis/refresh'));
app.use('/logout', require('./routes/apis/logout'));

app.use(verifyJWT);
app.use('/employees', require('./routes/apis/employees'));



/// END MIDDLEWARE


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// require('crypto').randomBytes(64).toString('hex')
// generate key