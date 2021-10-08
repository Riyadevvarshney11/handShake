const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    }
});

const Startup = mongoose.model('Startup',startupSchema);

module.exports = Startup;