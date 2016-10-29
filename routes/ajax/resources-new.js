"use strict";
//==========create new resources========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const userQuery = require("../../lib/database/user-queries.js");
const catQuery = require("../../lib/database/categories-queries.js");
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

router.post("/home/resources/new", (req, res) => {
  if(req.session["user-id"]) {
    //encode all text in obj
    let resourceObj = new Object();
    resourceObj.category = req.body.category;
    resourceObj.title = req.body.title;
    resourceObj.url = req.body.url;
    resourceObj.path = req.body.thumburl;
    resourceObj.description = req.body.description;
    resourceObj['created-by'] = req.session['user-id'];
    resourceObj['created-at'] = date.makeTimestamp();
    //check to see if fields are not blank
    // if(utils.checkValidText(resourceObj)) {
      //sanitize text
      resourceObj = utils.encodeText(resourceObj);
      //insert category first;
      catQuery.insertCategory(resourceObj.category, (categoryId) => {
        resourceObj["category-id"] = categoryId;
        console.log("inserted a category");
        //delete category as resource table does not take this column
        delete resourceObj.category;
        delete resourceObj.path;

        resQuery.insertResource(resourceObj, (resourceId) => {
          console.log("inserted resource");
          const thumbObj = {
            "path": req.body.thumburl,
            "resource-id": resourceId
          }
          thumbQuery.insertThumbnail(thumbObj ,(thumbid) => {
            //this is where ajax sent back!
          });
        });
      });

    // }

    //insert category into  table;


    // resourceObj["title"] = req.body.title;
    // resourceObj["url"] = req.body.url;
    // resourceObj["description"] = req.body.description;
    // resourceObj["created-at"] = Date.now();
    // resourceObj["category-id"] = req.body.title;
    // resourceObj["rating-id"] = req.body.title;
    // resourceObj["created-by"] = currentUserId;
    // res.render("resources-new", templateVars);
  }
  res.send(403, "/");
});

router.get("/home/resources/new", (req, res) => {
  if(req.session["user-id"]) {

    let currentUserId = req.session["user-id"];
    userQuery.findUserById(currentUserId, (err, user) => {
      //needs error handling but for now....
      let templateVars = {
        handle: user.handle,
        avatar: user.avatar,
        id: user.id
      }
    res.render("resources-new", templateVars);
    });
  } else {
    res.send(403, "/");
  }
});


module.exports = router;
