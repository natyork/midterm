exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function (table) {
    table.increments("id");//default: not nullable
    table.string("name").notNullable();
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
