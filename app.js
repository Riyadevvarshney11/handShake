const express = require('express');
const mongoose = require('mongoose');
const dotenv = require("dotenv")
const port = 3000;
const app=express();
const db = require('./config/mongoose');

//========  express router ===============
app.use('/',require('./routes'));

//================ Static Files ==================
app.use(express.static('./assets'));

//======== View Engine ======================
app.set('view engine','ejs');
app.set('views','./views');

app.listen(port,function(err){
    if(err){
        console.log(`Error encountered in running the server: ${err}`);
        //interpolation string
        return;
    }
    console.log(`Server is running on port: ${port}`);
});