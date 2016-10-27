exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({email: 'bob.midterm@gmail.com', password: "midterm2016", handle: "@bob", avatar: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png"}),
        knex('users').insert({email: 'alice.midterm@gmail.com',password: "midterm2016", handle: "@alice", avatar: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png"}),
        knex('users').insert({email: 'alanna.midterm@gmail.com',password: "midterm2016", handle: "@alanna", avatar: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png"})
      ]);
    });
};
