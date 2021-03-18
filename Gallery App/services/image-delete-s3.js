const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const path = require('path');


exports.deleteFromS3 = (folderName,dp) => {
    aws.config.update({
        secretAccessKey: process.env.AWS_SECRET_ACCESS,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        region: 'ap-south-1'
    });

    const s3 = new aws.S3();
    s3.deleteObject({
        Bucket: `henish-gallery-app/${folderName}`,
        Key: `${dp}`
    }, function (err, data) {
        if (data) {
            return data
        } else {
            return err
        }
      }) 
}

