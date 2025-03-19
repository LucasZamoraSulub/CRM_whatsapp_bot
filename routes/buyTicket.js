var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
require('dotenv').config()
var { movies } = require('../public/javascripts/movies');
const { sendMessage, getTemplatedMessageInput } = require("../messageHelper");

router.use(bodyParser.json());

router.post('/', function(req, res, next) {
  var movie = movies.filter((v,i) => v.id == req.body.id)[0];

  var data = getTemplatedMessageInput(process.env.RECIPIENT_WAID, movie, req.body.seats);
  
  sendMessage(data)
    .then(function (response) {
      res.redirect('/catalog');
      res.sendStatus(200);
      return;
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    });
});

module.exports = router;