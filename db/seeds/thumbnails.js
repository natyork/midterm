exports.seed = function(knex, Promise) {
  return knex('thumbnails').del()
    .then(function () {
      return Promise.all([
        knex('thumbnails').insert({"resource-id": 1, "path": "https://www.fillmurray.com/g/200/300"}),
        knex('thumbnails').insert({"resource-id": 2, "path": "https://www.fillmurray.com/284/196"}),
        knex('thumbnails').insert({"resource-id": 3, "path": "https://www.fillmurray.com/g/200/300"}),
        knex('thumbnails').insert({"resource-id": 4, "path": "https://www.fillmurray.com/284/196"}),
        knex('thumbnails').insert({"resource-id": 5, "path": "https://www.fillmurray.com/g/200/300"}),
        knex('thumbnails').insert({"resource-id": 6, "path": "https://www.placecage.com/c/460/300"})
      ]);
    });
};



