"use strict";
//login route
//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const db = require("../../lib/database/knex.js");
//const response = require("../../lib/server/response.js");
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
  //sends a response object to obj
  const responseObj = new Object();

  if(email && pw) {
    db.findUserByCredentials(email, pw, (err, result) =>{
      if(err) {
        responseObj["resStatus"] = 401;
        responseObj["msg"] = "error: login !";
        console.log(err, "\n\n\nasdfasdf");
        res.json(responseObj);
      } else {
        responseObj["resStatus"] = 200;
        responseObj["msg"] = "Oh no!";
        responseObj["userid"] = result.id;
        responseObj["user-handle"] = result.handle;
        console.log("success");
        res.json(responseObj);
      }
    });
  } else {
    responseObj["resStatus"] = 403;
    responseObj["msg"] = "Ohdd no!";
    res.json(responseObj);
  }
  // res.redirect("/cards");
});

//**let client handle redirects
module.exports = router;


//log in validation server side


