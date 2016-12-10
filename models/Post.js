var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    title:{type:String, required: true},
    email: {type: String, required: true, index: true, unique: true, trim: true},
    password: {type: String},
    content:{type:String},
    createdAt: {type: Date, default: Date.now},
    read:{type:Number, default:0},
},{
  toJSON: { virtuals: true},
  toObject: {virtuals: true}

});

var Post = mongoose.model('Post', schema);

module.exports = Post;
