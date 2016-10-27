exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function (table) {
    table.increments("id");//default: not nullable
    table.string("name").notNullable(); //person who pressed "like"
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
};
