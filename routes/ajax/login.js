"use strict";
// ======login route======//


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


//grab information from submit and begins validation process
router.post("/login", (req, res) => {
  const email = req.body.email.trim();
  const pw = req.body.pw.trim();
  //sends a response object to obj
  const responseObj = new Object();
  if(email && pw) {

    db.findUserByCredentials(email, pw, (err, result) =>{
      if(err) {
        //if error, send a status and a message
        responseObj["resStatus"] = 401;
        responseObj["msg"] = "error: login !";
        res.json(responseObj);
      } else {
        //set cookie by id
        req.session["user-id"] = result.id;
        //succesful login responds with status, msg as well
        //as the relevant user information selected from the db
        responseObj["resStatus"] = 200;
        responseObj["msg"] = "logged in!";
        responseObj["userid"] = result.id;
        responseObj["user-handle"] = result.handle;
        responseObj["url"] = "./home?sort=id";
        console.log("success @ /login");
        res.json(responseObj);
      }
    });
  } else {
      responseObj["resStatus"] = 403;
      responseObj["msg"] = "Ohdd no!";
      res.json(responseObj);
  }
});
router.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});
//**let client handle redirects
module.exports = router;


//log in validation server side


