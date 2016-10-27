exports.up = function(knex, Promise) {
  return knex.schema.createTable('resource-tags', function (table) {
    table.increments("id");//default: not nullable
    table.integer("resource-id").notNullable();
    table.integer("tag-id").notNullable(); //person who pressed "like"
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('resource-tags');
};
