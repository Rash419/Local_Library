var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Bookschema = new Schema({
    title:{type: String, required: true},
    author:{type: Schema.Types.ObjectId,ref: 'Author',required: true},
    summary:{type: String, required: true },
    isbn:{type: String,required: true},
    genre: [ {type: Schema.Types.ObjectId, ref: 'Genre'}]
});

Bookschema
.virtual('url')
.get(function () {
    return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book',Bookschema);
    
