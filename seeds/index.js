require('dotenv').config();

const mongoose = require('mongoose');

const db = require('../db');
const Campground = require('../models/campground');
const Review = require('../models/review');
const User = require('../models/user');
const { places, descriptors } = require('./seedHelpers');
const { citiesIN } = require('./cities');
const { imageUpload } = require('../cloudinary');
// const { getGeoJSON } = require('../mapbox');

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await User.deleteMany({});
  await Review.deleteMany({});

  const campgrounds = await Campground.find({});
  for(let campground of campgrounds) {
    await Campground.findByIdAndDelete(campground._id);
  }

  const adminData = {
    username: 'admin',
    email: 'admin@gmail.com',
    password: 'admin123'
  };
  const admin = new User({ username: adminData.username, email: adminData.email });
  const regAdmin = await User.register(admin, adminData.password);

  for(let i = 0; i < 100; ++i) {
    // const randomCityIndex = Math.floor(Math.random() * 1000);
    // const loc = `${cities[randomCityIndex].city}, ${cities[randomCityIndex].state}`;
    const city = sample(citiesIN);
    const price = Math.floor(Math.random() * 20) + 10;
    const file1 = await imageUpload('https://source.unsplash.com/collection/483251/1920x1080', 'CampGuide');
    const file2 = await imageUpload('https://source.unsplash.com/random/1920x1080', 'CampGuide');
    const camp = new Campground({
      // location: loc,
      location: `${city.city}, ${city.state}`,
      // geometry: await getGeoJSON(loc),
      geometry: { type: 'Point', coordinates: [ city.longitude, city.latitude ] },
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: file1.url,
          filename: file1.public_id
        },
        {
          url: file2.url,
          filename: file2.public_id
        }
      ],
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque officiis aut, sint libero, assumenda accusamus impedit ullam earum, animi veritatis itaque deleniti consequatur? Debitis ipsum, perferendis est cum rerum repudiandae.',
      price,
      author: regAdmin._id
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});