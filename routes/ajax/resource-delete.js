"use strict";
//==========create new resources========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const likeQuery = require("../../lib/database/like-queries.js");
const resQuery = require("../../lib/database/resource-queries.js");
const thumbQuery = require("../../lib/database/thumbnail-queries.js");
const catQuery = require("../../lib/database/categories-queries.js");

//const response = require("../../lib/server/response.js");
const cookieSession = require('cookie-session');


//middlewares
router.use(bodyParser.urlencoded({
  extended: false
}));


router.post("/home/resources/:id/delete", (req, res) => {
  if(req.session["user-id"]) {
    console.log("yes");
    resourceObj = {
      id: req.body.id,
      "created-by": req.session["user-id"]
    }
    resQuery.deleteResource(resourceObj, (count) => {

    });
  } else {
    res.redirect(403, "/");
  }

});




module.exports = router;
