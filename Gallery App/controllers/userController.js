const User = require('../models/user');
const app = require('../app');
const jwt = require('jsonwebtoken');
const { deleteFromS3 } = require('../services/image-delete-s3');


exports.register = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.dp = req.file.key;
        }
        const userExists = await User.findOne({ email: req.body.email });
        if (!userExists) {
            const user = await User.create(req.body);
            res.send({
                status: 'success',
                data: user,
            })

        } else {
            res.send({
                status: 'fail',
                message: 'This email is already registered'
            });
        }
    } catch (e) {
        // deleteFromS3('users-dp', req.file.key);
        res.status(401).json({ message: e.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email });
        if (!findUser) {
            res.send({ status: 'Not Found', message: 'This email is not registered, please register First' });
        }
        const match = await findUser.correctPassword(password, findUser.password);
        if (!match) {
            res.send({ status: 'Incorrect Password', message: 'Incorrect Password, Try Again !' });
        }
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET);
        await User.updateOne({ email: email }, { userToken: token, tokenExpiresIn: Date.now() });
        const user = await User.findOne({ email })
        res.status(201).json({
            status: 'success',
            message: "You are logged In",
            user,
        });
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}

exports.info = async (req, res, next) => {
    try {
        res.status(200).json({
            data: req.user
        })
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}

exports.updateMe = async (req, res, next) => {
    try {
        if (req.file) {
            req.body.dp = req.file.key;
        }
        const updated = await User.findOneAndUpdate({ _id: req.user._id }, req.body);
        res.status(201).json({
            status: 'success',
            data: updated
        })
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}

exports.removeDp = async (req, res, next) => {
    const user = await User.findByIdAndUpdate({ _id: req.user._id }, { $unset: { dp: '' } });
    res.send(user);
}
