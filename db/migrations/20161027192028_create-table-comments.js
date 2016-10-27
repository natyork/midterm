exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function (table) {
    table.increments("id");//default: not nullable
    table.string("content").notNullable();
    table.timestamp("created-at").notNullable();
    table.integer("resource-id").notNullable();
    table.integer("user-id").notNullable(); //person who created comment
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
