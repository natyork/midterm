exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then(function () {
      return Promise.all([
        knex('categories').insert({name: "Web Development"}),
        knex('categories').insert({name: "Organization"})
      ]);
    });
};



