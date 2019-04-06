const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({  
  name:{
    type: String,
  },
  type : {
    type: [String],
    enum: ['coffeshop', 'bookstore'],
    required: true   
    }
  },
 
 /*{ timestamps: true }*/);

placeSchema.index({ location: '2dsphere' });

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
