require('dotenv').config();


const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const time        = require('../server/date-utils');


module.exports = {
  getComments: (resource-id, user-id) => {
      knex
        .select('comments.content')
        .from('comments')
        .innerJoin('resources', 'comments.resource-id', 'resource-id')
        .innerJoin('users', 'comments.user-id', 'users.id')
        .where('resources.id', resource-id)
         .then((results) => {
        // console.log(results);
        res.json(results);
      });
}

//nat not using this for comments....patrick did you need this for anything or can we delete?





