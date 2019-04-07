const createError = require('http-errors');
const mongoose = require('mongoose');
const Place = require('../models/places.model');
const constants = require('../constants')

const PLACE_CATEGORIES = constants.PLACE_CATEGORIES

module.exports.list = (req, res, next) => {
  // const criteria = {};
  // if (req.query.place) {
  //   criteria.place = new RegExp(req.query.place, 'i');
  // }
  Place.find()
    .then(places => res.render('places/list', {places}))
    .catch(error => next(error));
}


module.exports.create = (req, res, next) => {
  const place = new Place();
  res.render('places/form', {categories: PLACE_CATEGORIES, place })
}

module.exports.doCreate = (req, res, next) => {
  const place = new Place({
    name: req.body.name,
    type: req.body.type
  })
  place.save()
    .then(() => res.redirect(`/places/${place._id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('places/form', {
          place,
          categories: PLACE_CATEGORIES,
          ...error
        })
      } else {
        next(error)
      }
    });
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  Place.findById(id)
    .then(place => {
      if (place) {
        res.render('places/form', {
          place,
          categories: PLACE_CATEGORIES,
        })
      } else {
        next(createError(404, 'Place not found'))
      }
    })
    .catch(error => next(error));
}


module.exports.details = (req, res, next) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404,'Places not found'))
  } else {
  Place.findById(id)
    .then(place => {
      if (place) {
        res.render('places/details', { place })        
        // .catch(next) // what is this catch doing here?
      } else {
        next(createError(404, 'place not found'))
      }
    })
    .catch(error => next(error));
  }
}