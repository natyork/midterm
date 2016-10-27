exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function (table) {
    table.increments("id");
    table.string("email").notNullable();
    table.string("password").notNullable();
    table.string("handle").notNullable();
    table.string("avatar"); //for now we are going to use favicons **optional
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
