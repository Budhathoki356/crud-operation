var express = require('express')
var router = express.Router()
var multer = require('multer')
var fs = require('fs')
var PlaceModel = require('../models/place.model')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage,
})


router.route('/')
    .get((req, res, next) => {
        PlaceModel.find({}).exec((err, places) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(places)
        })
    })
    .post(upload.single('image'), (req, res, next) => {
        if (req.file) {
            var mimeType = req.file.mimetype;
            var image = mimeType.split("/")[0];

            if (image != 'image') {
                fs.unlink('./images/' + req.file.filename);
                return next({
                    message: 'invalid file format',
                    status: 400
                })
            }

            req.body.image = req.file.filename
        }
        var { image, name, location, description } = req.body

        var newPlace = new PlaceModel({ image, name, location, description })

        newPlace.save((err, done) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(done)
        })
    })
router.route('/:id')
    .put(upload.single('image'), (req, res, next) => {
        if (req.file) {
            var mimeType = req.file.mimetype;
            var image = mimeType.split("/")[0];

            if (image != 'image') {
                fs.unlink('./images/' + req.file.filename);
                return next({
                    message: 'invalid file format',
                    status: 400
                })
            }

            req.body.image = req.file.filename
        }
        PlaceModel.findById(req.params.id, (err, place) => {
            if (err) {
                return next(err);
            }
            if (place) {
                var { image, name, description, location } = req.body
                place.image = image
                place.name = name.trim()
                place.description = description
                place.location = location.trim()

                place.save((err, updated) => {
                    if (err) {
                        return next(err)
                    }
                    res.status(200).json(updated)
                })
            } else {
                next({
                    message: 'Place not found.',
                    status: 400
                })
            }
        })
    })
    .delete((req, res, next) => {
        PlaceModel.findByIdAndDelete(req.params.id, (err, removed) => {
            if (err) {
                return next(err)
            }
            res.status(200).json(removed)
        })
    })

module.exports = router;