const createError = require('http-errors');
const mongoose = require('mongoose');
const Place = require('../models/places.model');

module.exports.list = (req, res, next) => {
  const criteria = {};

  if (req.query.place) {
    criteria.place = new RegExp(req.query.place, 'i');
  }

  Place.find(criteria)
    .then(places => res.render('places/list', { 
      places,
      place: req.query.place 
    }))
    .catch(error => next(error));
}


module.exports.create = (req, res, next) => {
  console.log('hello')
  res.render('places/form');
}
