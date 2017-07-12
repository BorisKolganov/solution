var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/highloaddb');

var Schema = mongoose.Schema;

var Location = new Schema({
    id: {
        type: Number,
        index: true
    },
    place: String,
    country: String,
    city: String,
    distance: Number
});

Location.methods.serialize = function () {
    return {
        id: this.id,
        place: this.place,
        country: this.country,
        city: this.city,
        distance: this.distance
    }
};

var LocationModel = mongoose.model('Location', Location);

module.exports.LocationModel = LocationModel;