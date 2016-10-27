exports.seed = function(knex, Promise) {
  return knex('resource-tags').del()
    .then(function () {
      return Promise.all([
        knex('resource-tags').insert({"resource-id": 1, "tag-id": 4}),
        knex('resource-tags').insert({"resource-id": 1, "tag-id": 2}),
        knex('resource-tags').insert({"resource-id": 1, "tag-id": 3}),
        knex('resource-tags').insert({"resource-id": 5, "tag-id": 1}),
        knex('resource-tags').insert({"resource-id": 6, "tag-id": 5})
      ]);
    });
};



