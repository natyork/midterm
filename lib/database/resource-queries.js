require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);




module.exports = {
 //insertResource takes in a resourceObject which contains
 // a title, url, description, timestamp, a foreign key to categories table,
 // and a foreinkey to the users table
 //this function is called via callback from insertCategory
 // to ensure a foreign -key from the categories table can be inserted into
 //this table

  insertResource: (resourceObj, callback) => {
    if(resourceObj) {
      knex.insert(resourceObj)
      .returning('id')
      .into('resources').then((resourceId) => {
        callback(null, resourceId[0]);
      });
    } else {
      callback(true, null);
    }
  },
  deleteResource: (resourceObj, callback) => {
    if(resourceObj) {
      knex('resources')
      .where({
        "id" : resourceObj.resourceId,
        "created-by" : resourceObj.userId
    })
    .del()
    .then((count) => {
      callback(count);
    })
    }
  }
}
//may have to destroy connection also needs validations
