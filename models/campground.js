const mongoose = require('mongoose');

const Review = require('../models/review');
const { cloudinary } = require('../cloudinary');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail')
  .get(function () {
    return this.url.replace('/upload', '/upload/w_400,h_300');
  });

const CampgroundSchema = new Schema({
  title: String,
  images: [ ImageSchema ],
  price: Number,
  description: String,
  location: String,
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [ Number ],
      required: true
    }
  },
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