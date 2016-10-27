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
      .select("*")
      .from("resources")
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}



