const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Garvit:JXybBho57CobnRA0@learning.rosxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

db=mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;

