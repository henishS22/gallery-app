var express = require('express');
const Media = require('../models/media');
const User = require('../models/user');
var router = express.Router();
let id;
let name;

/* GET home page. */
router.get('/', function (req, res, next) {
  id = '';
  res.render('pages/index');
});

router.get('/login', async function (req, res, next) {
  res.render('pages/login');
})

router.get('/register', async function (req, res, next) {
  res.render('pages/register');
})

router.get('/profile', async function (req, res, next) {
  const data = await User.findOne({ _id: req.query.id });
  res.render('pages/profile', { data: data });
})

router.get('/gallery', async function (req, res) {
  id = req.query.user;
  const user = await User.findOne({ _id: id });
  const data = await Media.find({ user: id, mediaType: req.query.type });
  res.render('pages/gallery', { user, allImg: data, favImg: 'undefined', videos: 'undefined', slides: 'undefined' });
})

router.get('/slideshow', async function (req, res) {
  const data = await Media.find({ user: req.query.id }).populate({ path: 'user' });
  const user = await User.findOne({ _id: req.query.id });
  console.log(user);
  res.render('pages/gallery', { user, favImg: 'undefined', allImg: 'undefined', videos: 'undefined', slides: data });
})

router.get('/favourites', async function (req, res) {
  const data = await Media.find({ isFavourite: 'true', user: req.query.id }).populate({ path: 'user' });
  const user = await User.findOne({ _id: req.query.id });
  res.render('pages/gallery', { user, favImg: data, allImg: 'undefined', videos: 'undefined', slides: 'undefined' });
})

router.get('/videos', async function (req, res) {
  const user = await User.findOne({ _id: req.query.user });
  const data = await Media.find({ mediaType: 'video', user: user });
  res.render('pages/gallery', { user, favImg: 'undefined', allImg: 'undefined', videos: data, slides: 'undefined' });
})


module.exports = router;
