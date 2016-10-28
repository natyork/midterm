exports.up = function(knex, Promise) {
  return knex.schema.createTable('thumbnails', function (table) {
    table.increments("id");//default: not nullable
    table.integer("resource-id").notNullable();
    table.text("path").notNullable(); //person who pressed "like"
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('thumbnails');
};
