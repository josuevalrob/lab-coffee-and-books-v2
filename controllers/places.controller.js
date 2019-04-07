const createError = require('http-errors');
const mongoose = require('mongoose');
const Place = require('../models/places.model');

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
  res.render('places/form', { place })
}

module.exports.doCreate = (req, res, next) => {
  console.log(req.body) // -> { name: 'user 2', mainCategory: 'coffeshop' }
  const place = new Place({
    name: req.body.name,
    type: req.body.type
  })
  console.log(place) // -> { type: [], _id: 5ca9cf25d545133292e82b07, name: 'user 2' }
  place.save()
    .then(() => res.redirect(`/places/${place._id}`))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('places/form', {
          place,
          ...error
        })
      } else {
        next(error)
      }
    });
}

module.exports.details = (req, res, next) => {
  const id = req.params.id;
  console.log(id)
  if (!mongoose.Types.ObjectId.isValid(id)) {
    next(createError(404,'Places not found'))
  } else {
    Place.findById(id)
      .then(place => {
        if (place) {

              res.render('places/details', { place })
          
            .catch(next)
        } else {
          next(createError(404, 'place not found'))
        }
      })
      .catch(error => next(error));
  }
}