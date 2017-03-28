/**
 * Created by gwenael on 28/03/2017.
 */

var Review = require('../models/review').model;

exports.addReview = function (req, res) {
    console.log('addReview');
    console.log(req.body);
    if (req.body) {
        var review = new Review({
            movie_id: req.body.film_id,
            user_id: req.body.user_id,
            commentaire: req.body.commentaire,
            note: req.body.note,
            date: Date.now(),
            type: req.body.type
        });
        review.save(function (err) {
            console.log(err);
        });
        res.status(200).send(review);
    }
    // Voir code erreur
};

exports.getReviewByFilmId = function (req, res) {
    Review.find({movie_id: req.params.id, type: 'movie'}, function (err, reviews) {
        res.status(200).send(reviews);
    });
};

exports.getReviewByTvshowId = function (req, res) {
    Review.find({movie_id: req.params.id, type: 'tvshow'}, function (err, reviews) {
        res.status(200).send(reviews);
    });
};

exports.deleteReviewById = function (req, res) {
    Review.findById(req.params.id, function (err, review) {
        if (!err) {
            if (review) {
                review.remove();
                res.status(200).send({message: "Deleted successfully"});
            }
        }
    })
};

exports.updateReview = function (req, res) {
    Review.findById(req.params.id, function (err, review) {
        if (!err) {
            if (review) {
                if (req.user.id === review.user_id) {
                    review.note = req.body.note;
                    review.commentaire = req.body.commentaire;
                    review.date = Date.now();
                    review.save();
                    res.status(200).send(review);
                }
                else {
                    res.status(412).send({message: "Review can only be modified by its owner."})
                }
            }
        }
    })
};