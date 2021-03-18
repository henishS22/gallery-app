const express = require('express');
const { loggedIn, protect } = require('../middlewares/auth');
const { register, login, info, updateMe, removeDp } = require('../controllers/userController');
const router = new express.Router();
const { uploadToS3 } = require('../services/image-upload-s3');
const { checkDp} = require('../middlewares/checkDp');

router.post('/register', uploadToS3('users-dp').single('profile'),register);
router.put('/login', login);
router.get('/info', loggedIn, protect, info);
router.put('/update', loggedIn, protect, checkDp, uploadToS3('users-dp').single('profile'), updateMe);
router.delete('/remove-dp', loggedIn, protect, checkDp, removeDp);

module.exports = router;