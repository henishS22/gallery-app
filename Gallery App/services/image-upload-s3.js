const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config({ path: '../config.env' });
const path = require('path');

exports.uploadToS3 = (folderName) => {


    aws.config.update({
        secretAccessKey: process.env.AWS_SECRET_ACCESS,
        accessKeyId: process.env.AWS_ACCESS_KEY,
        region: 'ap-south-1'
    });

    const s3 = new aws.S3();

    // const fileFilter = (req, file, cb) => {
    //     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //         cb(null, true)
    //     } else {
    //         cb(new Error('Invalid Mime Type, only JPEG and PNG'), false);
    //     }
    // }

    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: `henish-gallery-app/${folderName}`,
            acl: 'public-read',
            key: function (req, file, cb) {
                cb(null, `${file.originalname}_${Date.now()}${path.extname(file.originalname)}`);
            }
        })
    })
    return upload;
}
