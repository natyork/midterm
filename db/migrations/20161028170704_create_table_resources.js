exports.up = function(knex, Promise) {
  return knex.schema.createTable('resources', function (table) {
    table.increments("id"); //default: not nullable
    table.string("title").notNullable();
    table.string("url").notNullable();
    table.text("description").notNullable();
    table.timestamp("created-at").notNullable();
    table.integer("category-id").notNullable();
    table.integer("rating-id");
    table.integer("created-by").notNullable(); //user id
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('resources');
};
