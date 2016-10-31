"use strict";
//==========delete resource========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const likeQuery = require("../../lib/database/like-queries.js");
const resQuery = require("../../lib/database/resource-queries.js");
const thumbQuery = require("../../lib/database/thumbnail-queries.js");
const commentQuery = require("../../lib/database/comment-queries.js");

const cookieSession = require('cookie-session');


//middlewares
router.use(bodyParser.urlencoded({
  extended: false
}));


router.post("/home/resources/:id/delete", (req, res) => {
  if(req.session["user-id"]) {
    console.log("yes");
    let responseObj = new Object();
    let resourceObj = {
      "resource-id": req.body.id,
      "user-id": String(req.session["user-id"])
    }
    resQuery.deleteResource(resourceObj, (count) => {
      if(count > 0) {
        console.log("del resource");
        likeQuery.removeLike(resourceObj, (count) => {
          console.log("del like");
          thumbQuery.deleteThumbnail(resourceObj, (count) => {
            console.log("del thumbnail");
              commentQuery.deleteComments(resourceObj, (count) =>{             responseObj.resStatus = 200;
              responseObj.msg = "del okay";
              responseObj.url = "/home/user/" + req.session["user-id"];
              res.json(responseObj);
            });
          });
        });
      }
    });
  } else {
    res.redirect(403, "/");
  }

});

module.exports = router;
