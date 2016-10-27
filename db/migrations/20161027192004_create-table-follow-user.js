exports.up = function(knex, Promise) {
  return knex.schema.createTable('follow-user', function (table) {
    table.increments("id");//default: not nullable
    table.integer("user-id").notNullable(); //folower
    table.integer("followee-id").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('follow-user');
};
