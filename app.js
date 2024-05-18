const express = require('express');
const path = require('path');
const db = require('./db');

const Campground = require('./models/campground');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/makecamp', async (req, res) => {
  const camp = new Campground({ title: 'Backyard', description: 'Cheap camping' });
  await camp.save();
  res.json(camp);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});