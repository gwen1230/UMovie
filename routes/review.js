/**
 * Created by gwenael on 28/03/2017.
 */

var Review = require('../models/review').model;

exports.addReview = function (req, res) {
    console.log('addReview');
    var test = new Review({id_film: 'id_film',
        commentaire: 'Ceci est un commentaire',
        note: 5,
        id_user: 'id_user',
        date: Date.now()});
    test.save(function (err) {
        if (err)
            return console.error(err);
    });
};