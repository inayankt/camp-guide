const Campground = require("../models/campground");
const Review = require("../models/review");

module.exports.isCampAuthor = async (req, res, next) => {
  const campground = await Campground.findById(req.params.id);
  if(!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do that.');
    return res.redirect(`/campgrounds/${campground._id}`);
  }
  next();
};

module.exports.canDelReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const campground = await Campground.findById(id);
  const review = await Review.findById(reviewId);
  if(review.author.equals(req.user._id) || campground.author.equals(req.user._id)) {
    return next();
  }
  req.flash('error', 'You do not have permission to do that.');
  res.redirect(`/campgrounds/${campground._id}`);
};
