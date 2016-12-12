var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    user: {type: String}, //등록자
    city: {type: String}, //도시
    title: {type: String, require: true, trim: true}, //제목
    price: {type: Number},//가격
    people: {type: Number}, //인원
    intro: {type: String}, //소개
    createdAt: {type: Date, default: Date.now},
    read: {type: Number, default: 0},
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

var Book = mongoose.model('Book', schema);

module.exports = Book;