const express = require('express');

const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { validateCampground } = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = express.Router();

router.get('/', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}));

router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  req.flash('success', 'Campground registered.');
  res.redirect(`/campgrounds/${campground._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate('reviews');
  if(!campground) {
    req.flash('error', 'Requested campground not available.');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if(!campground) {
    req.flash('error', 'Requested campground not available.');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
}));

router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground }, { new: true });
  req.flash('success', 'Campground updated.');
  res.redirect(`/campgrounds/${campground._id}`);
}));

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  req.flash('success', 'Campground deleted.');
  res.redirect('/campgrounds');
}));

module.exports = router;