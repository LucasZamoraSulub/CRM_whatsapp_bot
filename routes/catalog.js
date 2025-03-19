var express = require('express');
const { movies } = require("../public/javascripts/movies");
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  res.render('catalog', { title: 'Movie Ticket Demo for Node.js', movies: movies });
});

router.get('/', function(req, res, next) {
  res.render('catalog', { title: 'Movie Ticket Demo for Node.js', movies: movies });
});

module.exports = router;