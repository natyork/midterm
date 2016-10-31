exports.up = function(knex, Promise) {
  return knex.schema.createTable('likes', function (table) {
    table.increments("id");//default: not nullable
    table.integer("resource-id").notNullable();
    table.integer("user-id").notNullable(); //person who pressed "like"
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('likes');
};
