exports.seed = function(knex, Promise) {
  return knex('follow-user').del()
    .then(function () {
      return Promise.all([
        knex('follow-user').insert({"user-id": 1, "followee-id": 2}),
        knex('follow-user').insert({"user-id": 1, "followee-id": 3}),
        knex('follow-user').insert({"user-id": 2, "followee-id": 3}),
        knex('follow-user').insert({"user-id": 3, "followee-id": 2})
      ]);
    });
};



