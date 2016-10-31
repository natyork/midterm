exports.up = function(knex, Promise) {
  return knex.schema.createTable('ratings', function (table) {
    table.increments("id");//default: not nullable
    table.integer("resource-id").notNullable();
    table.integer("rating").notNullable();
    //rating is either +1 or -1 and total rating for a resource is sum/count for that resouce id
   });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ratings');
};
