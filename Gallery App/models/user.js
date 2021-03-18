const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain "Password"');
            }
        }
    },
    dp:String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    userToken: {
        type: String,
    },
    tokenExpiresIn: {
        type: String,
    }
}, {collection: 'Users'})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.correctPassword = async function (password, encryptedPass) {
    return await bcrypt.compare(password, encryptedPass);
}

const User = db.model('Users', userSchema);
module.exports = User;