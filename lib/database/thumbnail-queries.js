require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);


module.exports = {

  insertThumbnail: (thumbnailObj, callback) => {
    if(thumbnailObj) {
      knex.insert(thumbnailObj)
      .returning('id')
      .into('thumbnails').then((thumbnailId) => {
        callback(null, thumbnailId);
        console.log("complete submission");
      });
    } else {
        callback(true, null);
    }
  },
  updateThumbnail: (thumbnailObj, callback) => {
    if(thumbnailObj) {
      knex('thumbnails')
      .where({"thumbnails.resource-id" : thumbnailObj.id})
      .update(thumbnailObj)
      .then((count) => {
        callback(count)
      });
    }
  },
  deleteThumbnail: (thumbnailObj, callback) => {
    if(thumbnailObj) {
      knex('thumbnails')
      .where({"thumbnails.resource-id" : thumbnailObj["resource-id"]})
      .del()
      .then((count) => {
        callback(count)
      });
    }
  },
}
//may have to destroy connection also needs validations
