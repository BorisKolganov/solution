var express = require('express');
var router = express.Router();
var LocationModel = require('../models/locations').LocationModel;


router.post('/new', function (req, res, next) {
    var location = new LocationModel(req.body);
    location.save(function (err) {
        console.log(err);
    });
    res.send('');
});

router.get('/:locationId', function (req, res, next) {
    LocationModel.findOne({'id': req.params.locationId}, function (err, location) {
        if (!err) {
            res.send(location.serialize());
            return
        }

        res.status(400);
        res.send('');
    });
});

router.post('/:locationId', function (req, res, next) {
    LocationModel.findOne({'id': req.params.locationId}, function (err, location) {
        if (!err) {
            for (var key in req.body) {
                if (location[key]) location[key] = req.body[key];
            }
            location.save(function (err) {
                if (!err) {
                    res.send(location.serialize());
                    return
                }
                res.status(400);
                res.send('');
            });
        } else {
            res.status(404);
            res.send('');
        }
    });
});

module.exports = router;
