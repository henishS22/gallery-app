const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcrypt');

const mediaSchema = new mongoose.Schema({
    mediaType: {
        type: String,
        default: 'img'
    },
    url: {
        type: String,
        required: [true, 'URL is required']
    },
    isFavourite: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'Users',
        required: [true, 'User required']
    }
})

const Media = db.model('Media', mediaSchema);
module.exports = Media;