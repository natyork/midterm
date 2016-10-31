require('dotenv').config();


const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {
  deleteComments: (commentsObj, callback) => {
    if(commentsObj) {


    }
  }

}

//nat not using this for comments....patrick did you need this for anything or can we delete?



