require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {
  //insertCategory takes in a name and a callback,
  // the callback  will call the insertResource function
  // from resource-queries.js
  // To maintain the integrity of the database,
  //the callbacks between insertCategory, insertResource
  // and insertThumbnail are ordered (by callback)
  //to occur in sequential order
  insertCategory: (name, callback) => {
    if(name) {
      knex.insert({name: name})
      .returning('id')
      .into("categories")
      .then((id) => {
        callback(null, id[0]);
      });
    } else {
        callback(true, null);
    }
  }
}
//may have to destroy connection also needs validations
