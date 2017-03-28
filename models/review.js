/**
 * Created by gwenael on 28/03/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var modelHelpers = require('./modelHelpers.js');


var reviewSchema = mongoose.Schema({
    id_user: 'string',
    id_film: 'string',
    commentaire: 'string',
    note: 'number',
    date: 'date'
});

reviewSchema.method('toJSON', modelHelpers.toJSON);

var Review = mongoose.model('Review', reviewSchema);

exports.schema = watchlistSchema;
exports.model = Watchlist;