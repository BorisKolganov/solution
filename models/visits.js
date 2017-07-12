var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/highloaddb');

var Schema = mongoose.Schema;

var Visit = new Schema({
    id: {
        type: Number,
        index: true
    },
    location: Number,
    user: Number,
    visited_at: {
        type: Date,
        set: function (d) {
            var date = d.split(' ')[0].split('.');
            var time = d.split(' ')[1].split(':');
            return new Date(Date.UTC(date[2], date[1] - 1, date[0], time[0], time[1], time[2]));
        }
    },
    mark: Number
});

Visit.methods.serialize = function () {
    return {
        id: this.id,
        location: this.location,
        user: this.user,
        visited_at: this.visited_at,
        mark: this.mark
    }
};

var VisitModel = mongoose.model('Visit', Visit);

module.exports.VisitModel = VisitModel;