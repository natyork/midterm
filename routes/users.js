"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where({id: req.params.id})
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}


