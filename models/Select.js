var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    address:{type: String},
    checkin: {type: String},
    checkout: {type: String},
    person: {type: Number}
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

var Select = mongoose.model('Select', schema);

module.exports = Select;