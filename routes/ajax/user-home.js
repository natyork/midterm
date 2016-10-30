"use strict";
//==========Main landing page========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const userQuery = require("../../lib/database/user-queries.js");
const catQuery = require("../../lib/database/categories-queries.js");
const resQuery = require("../../lib/database/resource-queries.js");
const thumbQuery = require("../../lib/database/thumbnail-queries.js");
const likeQuery = require("../../lib/database/like-queries.js");
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

router.get("/home/user/:id/", (req, res) => {
  if(req.session["user-id"]) {
    const userid = req.params.id;
    res.render("user_show", {user: userid});
  } else {
    res.redirect(403, "/");
  }
})

module.exports = router;
