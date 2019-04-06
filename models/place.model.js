const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  // ...
}, { timestamps: true });

placeSchema.index({ location: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
