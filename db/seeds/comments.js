exports.seed = function(knex, Promise) {
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        knex('comments').insert({content: "Yes! I love bullet journalling!", "created-at": "October 27, 2016", "resource-id": 4, "user-id": 2 }),
        knex('comments').insert({content: "Me too!", "created-at": "October 27, 2016", "resource-id": 4, "user-id": 1 }),
        knex('comments').insert({content: "This is a really helpful talk to understand asynchronous behaviour!", "created-at": "October 27, 2016", "resource-id": 3, "user-id": 1})
      ]);
    });
};



