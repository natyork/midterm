"use strict";
//==========create new resources========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const resQuery = require("../../lib/database/resource-queries.js");
const thumbQuery = require("../../lib/database/thumbnail-queries.js");
const date = require("../../lib/server/date-utils.js");
const utils = require("../../lib/server/validation-utils.js");

//const response = require("../../lib/server/response.js");
const cookieSession = require('cookie-session');


//middlewares
router.use(bodyParser.urlencoded({
  extended: false
}));

router.post("/home/resources/:id/edit" , (req, res) => {
  let responseObj = new Object();
  const errMsg = "error! There was trouble liking that post!";

  if(req.session["user-id"]) {
    let resourceObj = new Object();
    resourceObj.id = req.body.id;
    resourceObj.title = req.body.title;
    resourceObj.url = utils.makeFullUrl(req.body.url);
    resourceObj.description = req.body.description;
    resourceObj['created-at'] = date.makeTimestamp();
    if(utils.checkValidText(resourceObj)) {
      //sanitize text
      resourceObj = utils.encodeText(resourceObj);
      resQuery.updateResource(resourceObj, (count) => {
        //will add validations later (error messages)
        if (count > 0) {
          console.log("updated succesful")
          let thumbObj = new Object();
          thumbObj.id = req.body.id;
          thumbObj.path = req.body.thumburl;
          thumbQuery.updateThumbnail(thumbObj, (count) => {
            if (count > 0) {
              responseObj.resStatus = 200;
              responseObj.msg = "insert succesful";
              responseObj.url = "/home/user/" + req.session['user-id'];
              res.json(responseObj);
            }
          })
        }
      });
    }
  }  else {
    res.redirect(403, "/");
  }
});

module.exports = router;
