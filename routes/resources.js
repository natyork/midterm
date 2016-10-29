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
        res.json(results);
    });
  });

// ************************************************************************

  router.get("/filter", (req, res) => {
    knex
      .select("categories.*")
      .from("categories").whereRaw('LOWER(categories.name) LIKE ?', '%'+("BILL").toLowerCase()+'%')
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });
// ************************************************************************

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



