"use strict";
//==========like aresources========//


//constants
const express = require('express');
const router  = express.Router();
const bodyParser = require('body-parser');
const likeQuery = require("../../lib/database/like-queries.js");

//const response = require("../../lib/server/response.js");
const cookieSession = require('cookie-session');


//middlewares
router.use(bodyParser.urlencoded({
  extended: false
}));


router.post("/home/resources/:id/like" , (req, res) => {
  let responseObj = new Object();
  let requestObj = new Object();
  const errMsg = "error! There was trouble liking that post!";

  if(req.session["user-id"]) {
    let isLiked = req.body.isLiked;
    requestObj["user-id"] = req.session["user-id"];
    requestObj["resource-id"] = req.body["resource-id"];
    //send data into database
    if(isLiked === "false") {
      likeQuery.insertLike(requestObj, (err, likeId) => {
        if(err) {
          responseObj.resStatus = 403;
          responseObj.msg = errMsg;
          res.json(responseObj);
        }
        responseObj.resStatus = 200;
        responseObj.msg = "function succesful, likeId: " + likeId;
        res.json(responseObj);
      });
    } else if(isLiked === "true") {
        likeQuery.removeLike(requestObj, (count) => {
        if(!count) {
          responseObj.resStatus = 403;
          responseObj.msg = errMsg;
          res.json(responseObj);
        } else {
            responseObj.resStatus = 200;
            responseObj.msg = "deleted succesful count: " + count;
            res.json(responseObj);
        }
      });
    }
  } else {
      res.redirect(403, "/");
  }

});

module.exports = router;
