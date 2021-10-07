const express = require('express');
const mongoose = require('mongoose');
const port = 6000;
const app=express();

//======== use express router ===============
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log(`Error encountered in running the server: ${err}`);
        //interpolation string
        return;
    }
    console.log(`Server is running on port: ${port}`);
});