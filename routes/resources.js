"use strict";

const express = require('express');
const router  = express.Router();

module.exports = function (knex) {

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("resources").where({id: req.params.id})
      .then((results) => {
        res.json(results);
    });
  });

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

  router.get("/comments/:id", (req, res) => {
    knex
      .select("comments.*")
      .from("comments").where({"resource-id": req.params.id})
      .then((results) => {
        res.json(results);
    });
  });


  // ************************************************************************

  router.post("/resources/", (req, res) => {
    knex
      .select("catergories.*")
      .from("categories").where("categories.name", "like", "%bill%")
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });
  // ************************************************************************




  return router;
}



