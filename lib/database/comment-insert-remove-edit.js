require('dotenv').config();


const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const time        = require('../server/date-utils');


function getComments(comment, resource-id, user-id) {

      knex('comments')
      .insert({'resource-id': resource-id, content: comment, timestamp: time, 'user-id': user-id})
      .returning('id')
      .into("likes")
      .then((id) => {
        callback(null, id[0]);
      });



  },
  removeLike: (likeObj, callback) => {
    if(likeObj) {
      knex('likes').where({
        "resource-id" : likeObj["resource-id"],
        "user-id" : likeObj["user-id"]
      })
      .del()
      .then((count) => {
        callback(count);
      })
    }
  }
}

