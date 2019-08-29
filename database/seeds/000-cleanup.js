const cleaner = require('knex-cleaner');

// This will prevent foreign key errors
// when tring to truncate tables with
// foreign keys pointing to them

exports.seed = function(knex) {
  return cleaner.clean(knex); // empties all tables and resets all primary keys
};

// TRANSFORMS THE FOLLOWING:
// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('cohorts')
//     .truncate()
//     .then(function () {
//       // Inserts seed entries
//       return knex('cohorts').insert([
//         { name: 'WEB15' },
//         { name: 'WEB16' },
//         { name: 'WEB17' },
//       ]);
//     });
// };

// TO SIMPLY THIS:
// exports.seed = function(knex, Promise) {
//     return knex('cohorts').insert([
//       { name: 'WEB15' },
//       { name: 'WEB16' },
//       { name: 'WEB17' },
//     ]);
// };
