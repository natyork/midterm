require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);




module.exports = {


  insertResource: (resourceObj, callback) => {
    knex('resources').insert(resourceObj);
  }
}