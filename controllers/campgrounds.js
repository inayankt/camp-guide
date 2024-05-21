const Campground = require('../models/campground');

module.exports.allCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new');
};

module.exports.registerNewCamp = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  await campground.save();
  req.flash('success', 'Campground registered.');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  }).populate('author');
  if(!campground) {
    req.flash('error', 'Requested campground not available.');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
};

module.exports.renderEditForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if(!campground) {
    req.flash('error', 'Requested campground not available.');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground });
};

module.exports.editCampground = async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, { ...req.body.campground }, { new: true });
  req.flash('success', 'Campground updated.');
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  req.flash('success', 'Campground deleted.');
  res.redirect('/campgrounds');
};