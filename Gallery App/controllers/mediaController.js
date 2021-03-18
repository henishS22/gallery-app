const Media = require('../models/media');
const { deleteFromS3 } = require('../services/image-delete-s3');
exports.addImage = async (req, res, next) => {
    try {
        if (req.files) {
            const media = [];
            if (req.query.type == 'img') {
                req.body.mediaType = 'img'
            } else if (req.query.type == 'video') {
                req.body.mediaType = 'video'
            }
            for (let i = 0; i < req.files.length; i++) {

                req.body.url = req.files[i].key;
                req.body.user = req.user._id;
                media.push(await Media.create(req.body));
            }
            res.send({
                status: 'success',
                data: media
            })
        } else {
            res.send('Please select File to Upload');
        }
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}

exports.deleteImage = async (req, res, next) => {
    try {

        const data = await Media.findById(req.query.id);
        if (!data) {
            res.send('No media Found');
        }
        await deleteFromS3('user-media', data.url);
        const imgDelete = await Media.findOneAndDelete({ _id: data._id });
        res.send(imgDelete);
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}

exports.addToFav = async (req, res, next) => {
    try {
        const data = await Media.findById(req.body.id);
        if (!data) {
            res.send('No Media Found')
        }
        const fav = await Media.findOneAndUpdate({ _id: data._id }, { isFavourite: 'true' });
        if (fav) {
            res.send(fav);
        }
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}

exports.removeFromFav = async (req, res, next) => {
    try {
        const data = await Media.findById(req.body.id);
        if (!data) {
            res.send('No Media Found')
        }
        const fav = await Media.findOneAndUpdate({ _id: data._id }, { isFavourite: 'false' });
        if (fav) {
            res.send(fav);
        }
    } catch (e) {
        res.status(401).json({ message: e.message });
    }
}

exports.showAllImg = async (req, res, next) => {
    const data = await Media.find({ user: req.user._id });
    res.status(201).json({
        status: 'success',
        Images: data
    })
}

exports.showFav = async (req, res, next) => {
    const data = await Media.find({ user: req.user._id, isFavourite: 'true' });
}

