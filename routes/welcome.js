var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
require("dotenv").config();
const { sendMessage, getTextMessageInput } = require("../messageHelper");

router.use(bodyParser.json());

router.post("/", function (req, res, next) {
  var data = getTextMessageInput(
    process.env.RECIPIENT_WAID,
    "Welcome to the Movie Ticket Demo App for Node.js!"
  );

  sendMessage(data)
    .then(function (response) {
      res.redirect("/catalog");
    })
    .catch(function (error) {
      console.log(error);
      if (error.response && error.response.data) {
        console.log(error.response.data);
      }
      res.sendStatus(500);
    });
});

module.exports = router;
