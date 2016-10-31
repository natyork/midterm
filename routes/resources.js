"use strict";

const express = require('express');
const router  = express.Router();
const time = require('../lib/server/date-utils.js')

module.exports = function (knex) {

//get all resources
  router.get("/", (req, res) => {
    knex
      .select("resources.*", "thumbnails.path", "categories.name", "users.handle", "comments.content")
      .from("resources")
      .innerJoin("thumbnails", "resources.id", "thumbnails.resource-id")
      .innerJoin("categories", "resources.category-id", "categories.id")
      .innerJoin("users", "resources.created-by", "users.id")
      .leftOuterJoin("comments", "resources.id", "comments.resource-id")
      .then((results) => {
        // console.log(results);
        res.json(results);
    });
  });


  router.get("/filter", (req, res) => {
    let searchword = req.query.search.split(" ");
    console.log(searchword);
    let query = knex
      .select("resources.*", "thumbnails.path", "categories.name", "users.handle")
      .from("resources")
      .innerJoin("thumbnails", "resources.id", "thumbnails.resource-id")
      .innerJoin("categories", "resources.category-id", "categories.id")
      .innerJoin("users", "resources.created-by", "users.id")


    for (var i in searchword) {
      query.orWhere('categories.name', 'ILIKE', '%'+searchword[i]+'%')
    }

    query.then((results) => {
      console.log(results);
      res.json(results);

    });


  });

// comments start************************************************************************

  router.get("/comment", (req, res) => {
    let comment = req.query.content;
    let resourceid = req.query.resourceid;

    let user = req.session["user-id"];
    console.log("***********TESTING START*********: ",comment);
    console.log("COMMENT: ",comment);
    console.log ("user: ", user);
    console.log("resource: ",resourceid);
    console.log("***********TESTING END*********: ",comment);

    console.log(time.makeTimestamp());
    knex('comments')
      .insert({ 'resource-id': resourceid, content: comment, 'created-at': time.makeTimestamp(), 'user-id': user})
      .then(() => {
        knex
          .select('comments.content')
          .from('comments')
          .where('comments.resource-id', resourceid)
          .then((results)=>{
            console.log(JSON.stringify(results));
            res.json(results);
          });
        });
  });

// end************************************************************************

  router.get("/comments/:id", (req, res) => {
    knex
      .select("comments.*")
      .from("comments").where({"resource-id": req.params.id})
      .then((results) => {
        res.json(results);
    });
  });
  //get singular resource by id
  router.get("/:id", (req, res) => {
    knex
      .select("resources.*", "thumbnails.path", "categories.name")
      .from("resources")
      .innerJoin("thumbnails", "resources.id", "thumbnails.resource-id")
      .innerJoin("categories", "resources.category-id", "categories.id")
      .where({"resources.id": req.params.id})
      .then((results) => {
        if(req.session["user-id"] == results[0]["created-by"]) {
          res.json(results[0]);
        }
        res.send("not autheticated");
    });
  });
  //all resources per user and set admin priviledges if true
  router.get("/user/:id", (req, res) => {
    let responseObj = new Object();
    knex
      .select("resources.*", "thumbnails.path", "categories.name")
      .from("resources")
      .innerJoin("thumbnails", "resources.id", "thumbnails.resource-id")
      .innerJoin("categories", "resources.category-id", "categories.id")
      .where({"created-by": req.params.id})
      .then((results) => {
        responseObj.resources = results;
        if(req.session["user-id"] == req.params.id) {
          responseObj.admin = true;
        } else {
          responseObj.admin = false;
        }
        res.json(responseObj);
    });
  });
//get all  liked resources by userid
  router.get("/like/:userid", (req, res) => {
    knex
      .select("resources.*","thumbnails.path", "categories.name", "users.handle")
      .from("resources")
      .innerJoin("likes", "resources.id", "likes.resource-id")
      .innerJoin("thumbnails", "resources.id", "thumbnails.resource-id")
      .innerJoin("categories", "resources.category-id", "categories.id")
      .innerJoin("users", "resources.created-by", "users.id")
      .where({"likes.user-id": req.params.userid})
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}



