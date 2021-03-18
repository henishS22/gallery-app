const express = require('express');
const mongoose = require('mongoose');
const { deleteFromS3 } = require('../services/image-delete-s3');
const { uploadToS3 } = require('../services/image-upload-s3');

exports.checkDp = async (req, res, next) => {
    if (req.user.dp) {
        
        const del = await deleteFromS3('users-dp', req.user.dp);
        next();
    } else {
        next();
    }
}