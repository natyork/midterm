exports.seed = function(knex, Promise) {
  return knex('likes').del()
    .then(function () {
      return Promise.all([
        knex('likes').insert({"resource-id": 1, "user-id": 1}),
        knex('likes').insert({"resource-id": 1, "user-id": 2}),
        knex('likes').insert({"resource-id": 2, "user-id": 3}),
        knex('likes').insert({"resource-id": 2, "user-id": 3}),
        knex('likes').insert({"resource-id": 3, "user-id": 2}),
        knex('likes').insert({"resource-id": 3, "user-id": 1}),
        knex('likes').insert({"resource-id": 4, "user-id": 2}),
        knex('likes').insert({"resource-id": 4, "user-id": 1})
      ]);
    });
};



