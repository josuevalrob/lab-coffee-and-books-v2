const hbs = require('hbs');

hbs.registerHelper('isMainCategory', function (place, category, options) {
  console.log(category)
  if (place.type.includes(category)) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
});