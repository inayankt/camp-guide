const mongoose = require('mongoose');

const Review = require('../models/review');
const { cloudinary } = require('../cloudinary');

const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
  title: String,
  images: [
    {
      url: String,
      filename: String
    }
  ],
  price: Number,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

CampgroundSchema.post('findOneAndDelete', async (doc) => {
  if(doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews
      }
    });

    for(let img of doc.images) {
      if(img.filename) await cloudinary.uploader.destroy(img.filename);
    }
  }
});

module.exports = mongoose.model('Campground', CampgroundSchema);