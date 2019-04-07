const express = require('express');
const router = express.Router();
const placesController =  require('../controllers/places.controller');

router.get('/new', placesController.create);
router.post('/', placesController.doCreate);

router.get('/:id/edit', placesController.edit);
// router.post('/:id', placesController.doEdit);

// list.hbs && singlePlace
router.get('/', placesController.list);
// details.hbs
router.get('/:id', placesController.details);

module.exports = router;