'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('authors', [
      { firstName: 'Keith',
        lastName: 'Fuller',
        bio: 'Key contributor to various newspapers in the Greater Puget Sound area. Father. Bike enthusiast.'
      },
      { firstName: 'Bobby',
        lastName: 'Bobbington',
        bio: 'Adventurer, biking and hiking enthusiast.'
      },
      { firstName: 'Misty',
        lastName: 'Owens',
        bio: 'Blogger in favor of public transit and community building in First Hill and Capitol Hill.'
      }
    ], { returning: true }).then(function(authors) {
      return queryInterface.bulkInsert('posts', [
        { title: 'Bike usage in Seattle grows as city plans new lanes.',
          content: 'Bike lanes in the downtown area, as well as the surrounding areas, are being installed.',
          authorId: authors[0].id
        },
        { title: 'Local Events: Capitol Hill Art Walk',
          content: 'Celebrate community and expression at the next Capitol Hill Art Walk.',
          authorId: authors[0].id
        },
        { title: 'Things To Do: Hike Rattlesnake Ridge',
          content: 'This 2 mile hike is difficult enough to feel like an accomplishment, easy enough for most people to handle, and has a great view at the top.',
          authorId: authors[1].id
        }
      ]);
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('authors', null, {});
  }
};
