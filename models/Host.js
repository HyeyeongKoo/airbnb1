var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: String}, //등록자
    city: {type: String}, //도시
    address:{type: String}, //주소
    title: {type: String, require: true, trim: true}, //제목
    price: {type: Number},//요금
    convenient : {type: String}, //편의시설
    rule: {type: String}, //이용규칙
    intro: {type: String}, //소개
    createdAt: {type: Date, default: Date.now},
    read: {type: Number, default: 0},
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

schema.methods.generateHash = function(password) {
  var salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};


var Host = mongoose.model('Host', schema);

module.exports = Host;
