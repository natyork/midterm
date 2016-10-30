"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {
    knex
      .select("handle", "avatar", "email", "id")
      .from("users")
      .where({id: req.params.id})
      .then((results) => {
        res.json(results[0]);
    });
  });

  return router;
}


