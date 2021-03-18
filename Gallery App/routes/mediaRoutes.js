const express = require('express');
const { loggedIn, protect } = require('../middlewares/auth');
const router = new express.Router();
const { uploadToS3 } = require('../services/image-upload-s3');
const { addImage, deleteImage, addToFav ,showAllImg, showFav, removeFromFav} = require('../controllers/mediaController');
const { deleteFromS3 } = require('../services/image-delete-s3');


router.post('/add-media', loggedIn, protect, uploadToS3('user-media').array('media'), addImage);
router.delete('/delete-image', loggedIn, protect, deleteImage);
router.put('/add-to-fav', loggedIn, protect, addToFav);
router.put('/remove-fav', loggedIn, protect, removeFromFav);
router.get('/all-image', loggedIn, protect, showAllImg);
router.get('/show-fav', loggedIn, protect, showFav);


module.exports = router;

