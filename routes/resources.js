"use strict";

const express = require('express');
const router  = express.Router();

module.exports = function (knex) {


  router.get("/", (req, res) => {
    knex
      .select("resources.*", "thumbnails.path", "categories.name", "users.handle")
      .from("resources")
      .innerJoin("thumbnails", "resources.id", "thumbnails.resource-id")
      .innerJoin("categories", "resources.category-id", "categories.id")
      .innerJoin("users", "resources.created-by", "users.id")
      .then((results) => {
        // console.log(results);
        res.json(results);
    });
  });

// start************************************************************************

  router.get("/filter", (req, res) => {
    let searchword = (req.query.search).split(" ");
    console.log(searchword);
    let query = knex
      .select()
      .from("categories")

    // let condition = "";
    // let escape =[]

    for (var i in searchword) {

      query.orWhere('categories.name', 'ILIKE', '%'+searchword[i]+'%')

}



      query.then((results) => {
        //iterate over results to remove duplicates?
        res.json(results);

        console.log(results.toString());
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

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("resources").where({id: req.params.id})
      .then((results) => {
        res.json(results);
    });
  });




  return router;
}



