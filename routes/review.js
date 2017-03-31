/**
 * Created by gwenael on 28/03/2017.
 */

var Review = require('../models/review').model;
var User = require('../models/user').model;


exports.addReview = function (req, res) {
    console.log('addReview');
    console.log(req.body);
    if (req.body) {
        User.findById(req.user.id, function (err, user) {
            var review = new Review({
                owner: user.toJSON(),
                movie_id: req.body.movie_id,
                comment: req.body.comment,
                rating: req.body.rating,
                date: Date.now(),
                type: req.body.type
            });
            review.save(function (err) {
                console.log(err);
            });
            res.status(200).send(review);
        })
    }
    // Voir code erreur
};

exports.getReviewByFilmId = function (req, res) {
    Review.find({movie_id: req.params.id, type: 'movie'}).sort('-date').exec(function (err, reviews) {
        res.status(200).send(reviews);
    });
};

exports.getReviewByTvshowId = function (req, res) {
    Review.find({movie_id: req.params.id, type: 'tvshow'}).sort('-date').exec(function (err, reviews) {
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
                    review.rating = req.body.rating;
                    review.comment = req.body.comment;
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