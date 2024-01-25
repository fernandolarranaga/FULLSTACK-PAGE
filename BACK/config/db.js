const mongoose=require('mongoose');
console.log('Versión de Mongoose:', mongoose.version);

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/music', { useNewUrlParser: true })

  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });