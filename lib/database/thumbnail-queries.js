require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);




module.exports = {


  insertThumbnail: (resourceObj, callback) => {
    knex.insert(resourceObj)
    .returning('id')
    .into('thumbnails').then((resourceId) => {
      callback(resourceId);
      console.log("complete submission");
    });
  }
}
//may have to destroy connection also needs validations
