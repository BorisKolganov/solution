var express = require('express');
var router = express.Router();
var VisitModel = require('../models/visits').VisitModel;


router.post('/new', function (req, res, next) {
    var visit = new VisitModel(req.body);
    visit.save(function (err) {
        console.log(err);
    });
    res.send('');
});

router.get('/:visitId', function (req, res, next) {
    VisitModel.findOne({'id': req.params.visitId}, function (err, visit) {
        if (!err) {
            res.send(visit.serialize());
            return
        }

        res.status(400);
        res.send('');
    });
});

router.post('/:visitId', function (req, res, next) {
    VisitModel.findOne({'id': req.params.visitId}, function (err, visit) {
        if (!err && visit) {
            for (var key in req.body) {
                if (visit[key]) visit[key] = req.body[key];
            }
            visit.save(function (err) {
                if (!err) {
                    res.send(visit.serialize());
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
