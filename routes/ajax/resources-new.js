"use strict";
//==========create new resources========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const db = require("../../lib/database/user-queries.js");
const valid = require("../../lib/server/validation-utils.js");
//const response = require("../../lib/server/response.js");
const cookieSession = require('cookie-session');


//middlewares
router.use(bodyParser.urlencoded({
  extended: false
}));

router.post("/home/resources/new", (req, res) => {
  if(req.session["user-id"]) {
    //encode all text in obj
    const category = db.encodeText(req.body.category);
    const title = db.encodeText(req.body.title);
    const url = db.encodeText(req.body.url);
    const thumburl = db.encodeText(req.body.thumburl);
    const description = db.encodeText(req.body.description);

    console.log(reqObj, "this is the reqObj");


    let resourceObj = new Object();
    let currentUserId = req.session["user-id"];
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
    db.findUserById(currentUserId, (err, user) => {
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
