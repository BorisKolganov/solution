var mongoose = require('mongoose');
var dateFormat = require('dateformat');
mongoose.connect('mongodb://localhost/highloaddb');

var Schema = mongoose.Schema;

var User = new Schema({
    id: {
        type: Number,
        index: true
    },
    email: String,
    first_name: String,
    last_name: String,
    gender: String,
    birth_date: {
        type: Date,
        set: function (d) {
            var d = d.split('.');
            return new Date(Date.UTC(d[2], d[1] - 1, d[0], 0, 0, 0));
        }
    }
});

User.methods.serialize = function () {
    return {
        id: this.id,
        email: this.email,
        first_name: this.first_name,
        last_name: this.last_name,
        gender: this.gender,
        birth_date: dateFormat(this.birth_date, "dd.mm.yyyy")
    }
};

var UserModel = mongoose.model('User', User);

module.exports.UserModel = UserModel;