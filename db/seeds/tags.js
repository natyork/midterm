exports.seed = function(knex, Promise) {
  return knex('tags').del()
    .then(function () {
      return Promise.all([
        knex('tags').insert({name: "Cleaning"}),
        knex('tags').insert({name: "Learning"}),
        knex('tags').insert({name: "awesome"}),
        knex('tags').insert({name: "nerd stuff"}),
        knex('tags').insert({name: "Nick Cage"})
      ]);
    });
};



