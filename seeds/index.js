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
    const camp = new Campground({
      location: `${cities[randomCityIndex].city}, ${cities[randomCityIndex].state}`,
      title: `${sample(descriptors)} ${sample(places)}`
    });
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})