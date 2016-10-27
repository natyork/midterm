exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'bob.midterm@gmail.com'}),
        knex('users').insert({email: 'alice.midterm@gmail.com'}),
        knex('users').insert({email: 'alanna.midterm@gmail.com'})
      ]);
    });
};
