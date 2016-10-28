"use strict";
//login route
//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const db = require("../../lib/database/knex.js");
// const cookieSession = require('cookie-session');
//middlewares
router.use(bodyParser.urlencoded({
  extended: false
}));
// router.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2']
// }));

//grab infromation submit and begins validation process
router.post("/login", (req, res) => {
  const email = req.body.email.trim();
  const pw = req.body.pw.trim();

  if(email && pw) {
    db.findUserByCredentials(email, pw, (err, result) =>{
      if(err) {
        res.redirect(401, "/");
      } else {
        console.log("success");
        res.json(result);
      }
    });
  } else {
    res.redirect(403, "/");
  }
  // res.redirect("/cards");
});


module.exports = router;


//log in validation server side


