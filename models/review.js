/**
 * Created by gwenael on 28/03/2017.
 */
var mongoose = require('mongoose');
var modelHelpers = require('./modelHelpers.js');

var reviewSchema = mongoose.Schema({
    user_id: String,
    movie_id: String,
    commentaire: String,
    note: Number,
    date: Date,
    type: String
});

reviewSchema.method('toJSON', modelHelpers.toJSON);

var Review = mongoose.model('Review', reviewSchema);

exports.schema = reviewSchema;
exports.model = Review;