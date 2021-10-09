const mongoose = require('mongoose');

const InvestorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    company : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Investor = mongoose.model('Investor',InvestorSchema);

module.exports = Investor;