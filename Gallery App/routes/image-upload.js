const express = require('express');
const router = new express.Router();
const upload = require('../services/image-upload-s3');
const singleUpload = upload.single('profile');

router.post('/upload', async function (req, res, next) {
    
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send('File Upload Error');
        }
        return res.json({ 'imageUrl': req.file.location });
    });
});

module.exports = router;