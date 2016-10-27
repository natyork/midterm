exports.seed = function(knex, Promise) {
  return knex('ratings').del()
    .then(function () {
      return Promise.all([
        knex('ratings').insert({"resource-id": 1, "rating": 1}),
        knex('ratings').insert({"resource-id": 1, "rating": -1}),
        knex('ratings').insert({"resource-id": 2, "rating": -1}),
        knex('ratings').insert({"resource-id": 2, "rating": -1}),
        knex('ratings').insert({"resource-id": 3, "rating": 1}),
        knex('ratings').insert({"resource-id": 3, "rating": 1}),
        knex('ratings').insert({"resource-id": 4, "rating": 1}),
        knex('ratings').insert({"resource-id": 4, "rating": 1})
      ]);
    });
};



