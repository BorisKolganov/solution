var express = require('express');
var router = express.Router();
var UserModel = require('../models/users').UserModel;


router.post('/new', function (req, res, next) {
    var user = new UserModel(req.body);
    user.save(function (err) {
        console.log(err);
    });
    res.send('');
});

router.get('/:userId', function(req, res, next) {
    UserModel.findOne({'id': req.params.userId}, function (err, user) {
        if (!err) {
            res.send(user.serialize());
            return
        }
        res.status(400);
        res.send('');
    });
});

router.post('/:userId', function (req, res, next) {
    UserModel.findOne({'id': req.params.userId}, function (err, user) {
        if (!err) {
            for (var key in req.body) {
                if (user[key]) user[key] = req.body[key];
            }
            user.save(function (err) {
                if (!err) {
                    res.send(user.serialize());
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
