const express = require('express');
const router = express.Router();
const placesController =  require('../controllers/places.controller');

router.get('/new', placesController.create);
router.post('/', placesController.doCreate);

// list.hbs && singlePlace
router.get('/', placesController.list);
// details.hbs
router.get('/:id', placesController.details);

module.exports = router;