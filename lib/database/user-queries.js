require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const knexConfig  = require("../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);


module.exports = {
  //queries users table in db via email and pw,
  //if query is not successful (by testing the returned arraylength)
  //send back arbitry message in error so user can be redirected 401
  findUserByCredentials: (email, password, callback) => {
    if(email) {
      knex.select().from("users")
      .where({email: email, password: password})
      .asCallback((err, user) => {
        if(err) {
          callback(err, null)
          console.log("could not validate with credentials")
        }
        if(user.length) {
          //if valid send the user obj
          callback(null, user[0]);
        } else {
          callback("error", null);
        }
        console.log("closed connection");
      });
    }
  },
  findUserById: (id, callback) => {
    if(id) {
      knex.select().from("users")
      .where({id: id})
      .asCallback((err, user) => {
        if(err) {
          callback(err, null)
        }
        if(user.length) {
          //if valid send the user obj
          callback(null, user[0]);
        } else {
          callback("error", null);
        }
        console.log("closed connection");
      });
    }
  }
}


