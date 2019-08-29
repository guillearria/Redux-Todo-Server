
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').insert([
    {id: 1, item: 'Walk dog', completed: false},
    {id: 2, item: 'Take out trash', completed: false},
    {id: 3, item: 'Cook dinner', completed: false}
  ]);
};
