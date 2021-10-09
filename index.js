const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const port = 3000;
const app=express();
const db = require('./config/mongoose');
const passport = require('passport');
const passportLocal = require('./config/passport-strategy-local');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');

dotenv.config();

// form data parsing
app.use(express.urlencoded());



//================ Static Files ==================
app.use(express.static('./assets'));
app.use(cookieParser());

//======== View Engine ======================
app.set('view engine','ejs');
app.set('views','./views');

//======== Session Creation ==================
//mongo store is used to store the session cookie in the db
app.use(session({
    name: 'handshake',
    //TODO change the secret before deployment in production mode
    secret: 'innovathon',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) //ms
    },
    store: MongoStore.create(
        {
            mongoUrl: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning.rosxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

//======== Using Passport =======================
app.use(passport.initialize());
//app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//========  express router ===============
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error encountered in running the server: ${err}`);
        //interpolation string
        return;
    }
    console.log(`Server is running on port: ${port}`);
});