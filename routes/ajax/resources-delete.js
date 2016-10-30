"use strict";
//==========create new resources========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const likeQuery = require("../../lib/database/like-queries.js");

//const response = require("../../lib/server/response.js");
const cookieSession = require('cookie-session');


//middlewares
router.use(bodyParser.urlencoded({
  extended: false
}));


router.post("/home/resources/:id/delete") {
  if(req.session["user-id"]) {

  } else {
    res.redirect(403, "/");
  }
}



module.exports = router;
