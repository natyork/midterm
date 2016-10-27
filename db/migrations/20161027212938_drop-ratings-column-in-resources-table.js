
exports.up = function(knex, Promise) {
  return knex.schema.table('resources', function (table) {
    table.dropColumn("rating-id");
   });
};

exports.down = function(knex, Promise) {
return knex.schema.dropTable('resources');
};
