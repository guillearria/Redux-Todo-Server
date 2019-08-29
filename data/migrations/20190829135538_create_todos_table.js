exports.up = function(knex) {
  return knex.schema
    .createTable("todos", todos => {
      todos.increments()

      todos.string("item", 128).notNullable()

      todos.string("completed", 128).defaultTo("false")
    })  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("todos");
};
