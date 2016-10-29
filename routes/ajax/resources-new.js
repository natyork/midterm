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
  //instantiate a response object to be sent back
  //to client, takes in a custom response code (for dev purposes),
  //a message and possibly a data object if the response was deemed
  //succesful
  let responseObj = new Object();
  const errMsg = "error! There was trouble handling submit request!";

  if(req.session["user-id"]) {
    //encode all text in obj
    let resourceObj = new Object();
    resourceObj.category = req.body.category;
    resourceObj.title = req.body.title;
    resourceObj.url = req.body.url;
    responseObj.path = req.body.thumburl;
    resourceObj.description = req.body.description;
    resourceObj['created-by'] = req.session['user-id'];
    resourceObj['created-at'] = date.makeTimestamp();
    //check to see if fields are not blank
    if(utils.checkValidText(resourceObj)) {
      //sanitize text
      resourceObj = utils.encodeText(resourceObj);
      //insert category first;
      //============stage 1============//
      catQuery.insertCategory(resourceObj.category, (err, categoryId) => {
        if(err) {
          responseObj.resStatus = 403;
          resourceObj.msg = errMsg;
          res.json(responseObj);
        }
        resourceObj["category-id"] = categoryId;
        console.log("inserted a category");
        //delete category as resource table does not take this column
        delete resourceObj.category;
        delete resourceObj.path;
      //===========stage 2==============//
        resQuery.insertResource(resourceObj, (err, resourceId) => {
          if(err) {
            responseObj.resStatus = 403;
            resourceObj.msg = errMsg;
            res.json(responseObj);
          }
          console.log("inserted resource");
          const thumbObj = {
            "path": req.body.thumburl,
            "resource-id": resourceId
          }
          //===========stage 3============//
          thumbQuery.insertThumbnail(thumbObj ,(err, thumbid) => {
            if(err) {
              responseObj.resStatus = 403;
              responseObj.msg = errMsg;
              res.json(responseObj);
            }
            console.log("inserted thumb");
            responseObj.resStatus = 200;
            responseObj.msg = "submit succesful";
            responseObj.url = "/home";
            res.json(responseObj);
          });
        });
      });
    } else {
      //if fields are blank return back to ajax call
      responseObj.resStatus = 403;
      responseObj.msg = errMsg;
      res.json(responseObj);
    }
  } else {
    //return user back to home if they are not logged in
    res.send(403, "/");
  }
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
      //return user back to home if they are not logged in
      res.send(403, "/");
  }
});


module.exports = router;
