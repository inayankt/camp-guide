const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/camp-guide';

mongoose.connect(url);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});
