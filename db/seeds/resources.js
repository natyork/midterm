exports.seed = function(knex, Promise) {
  return knex('resources').del()
    .then(function () {
      return Promise.all([
        knex('resources').insert({title: 'Knex Docs', url: "http://knexjs.org/", description: "Official Knex documentation.", "created-at": "October 27, 2016", "category-id": 1 , "created-by": 1}),
        knex('resources').insert({title: 'jQuery Docs', url: "http://jquery.com/", description: "Official jQuery documentation.", "created-at": "October 27, 2016", "category-id": 1, "created-by": 1}),
        knex('resources').insert({title: 'Event Loops Talk', url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", description: "Great talk by Philip Roberts on the JS Event Loop from JSConf EU 2014.", "created-at": "October 27, 2016", "category-id": 1, "created-by": 2}),
        knex('resources').insert({title: 'Bullet Journalling', url: "http://bulletjournal.com/", description: "Original source for how to create a bullet journal.", "created-at": "October 27, 2016", "category-id": 2, "created-by": 3}),
        knex('resources').insert({title: 'How to Fold Shirts', url: "http://tidyingup.com/", description: "Kon Mari method for folding shirts", "created-at": "October 27, 2016", "category-id": 2, "created-by": 3}),
        knex('resources').insert({title: 'Apartment Therapy Organizing', url: "http://www.apartmenttherapy.com/categories/organizing", description: "Apartment Therapy articles on organizing.", "created-at": "October 27, 2016", "category-id": 2, "created-by": 3})
      ]);
    });
};



