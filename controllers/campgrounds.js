const Campground = require('../models/campground');
const { cloudinary } = require('../cloudinary');
const { getGeoJSON } = require('../mapbox');

module.exports.allCampgrounds = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds, docTitle: 'All Campgrounds' });
};

module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new', { docTitle: 'Register new Campground' });
};

module.exports.registerCampground = async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.geometry = await getGeoJSON(campground.location);
  campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
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
  res.render('campgrounds/show', { campground, docTitle: campground.title });
};

module.exports.renderEditForm = async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if(!campground) {
    req.flash('error', 'Requested campground not available.');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/edit', { campground, docTitle: `Edit ${campground.title}` });
};

module.exports.editCampground = async (req, res) => {
  const { campground } = req.body;
  campground.geometry = await getGeoJSON(campground.location);
  const camp = await Campground.findByIdAndUpdate(req.params.id, { ...campground }, { new: true });
  const newImages = req.files.map(f => ({ url: f.path, filename: f.filename }));
  camp.images.push(...newImages);
  await camp.save();
  if(req.body.deleteImages) {
    for(let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
  }
  req.flash('success', 'Campground updated.');
  res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  await Campground.findByIdAndDelete(req.params.id);
  req.flash('success', 'Campground deleted.');
  res.redirect('/campgrounds');
};