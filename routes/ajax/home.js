"use strict";
//==========Main landing page========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const db = require("../../lib/database/user-queries.js");
//const response = require("../../lib/server/response.js");
const cookieSession = require('cookie-session');


//middlewares
router.use(bodyParser.urlencoded({
  extended: false
}));
router.use(cookieSession({
  name: 'session',
  //to be changed
  secret: "liamneeson"
}));


router.get("/home", (req, res) => {
  // note to self :add validation***
  if(req.session["user-id"]) {
    console.log(req.session["user-id"], "this is the id!\n\n\n");
     db.findUserById(req.session["user-id"],(err, user) => {
      res.render("resources", {
        user: user.id,
        avatar: user.avatar
      });
     });
    console.log(req.query, " success @ /home");
  } else {
    res.redirect(403, "/");
  }
});

module.exports = router;
