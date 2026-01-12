const e = require('express');
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email :{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true      

    },
    password: {
        type: String,
        required: true      

    },
    list :[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List'
    }]
});
exports.User = mongoose.model('User', user);
