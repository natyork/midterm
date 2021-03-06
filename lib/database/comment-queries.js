require('dotenv').config();


const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {
  deleteComments: (commentsObj, callback) => {
    if(commentsObj) {
      knex('comments')
      .where({'resource-id': commentsObj["resource-id"]})
      .del()
      .then((count) => {
        callback(count);
      });
    }
  }
}




