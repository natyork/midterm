require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);




module.exports = {


  insertResource: (resourceObj, callback) => {
    knex.insert(resourceObj)
    .returning('id')
    .into('resources').then((resourceId) => {
      callback(resourceId[0]);
    });
  }
}
//may have to destroy connection also needs validations
