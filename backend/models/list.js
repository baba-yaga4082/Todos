const e = require('express');
const mongoose = require('mongoose');
const { User } = require('./user');

const listSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true      

    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}
 ,{ timestamps: true } );
exports.List = mongoose.model('List', listSchema);
