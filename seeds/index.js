const mongoose = require('mongoose');

const db = require('../db');
const Campground = require('../models/campground');
const { places, descriptors } = require('./seedHelpers');
const cities = require('./cities');

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for(let i = 0; i < 50; ++i) {
    const randomCityIndex = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[randomCityIndex].city}, ${cities[randomCityIndex].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://source.unsplash.com/collection/483251',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque officiis aut, sint libero, assumenda accusamus impedit ullam earum, animi veritatis itaque deleniti consequatur? Debitis ipsum, perferendis est cum rerum repudiandae.',
      price
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})