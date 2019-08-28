const db = require("../data/dbConfig");

module.exports = {
  insert, 
  delete,
  getAll,
  toggleCompleted,
  clearCompleted
}

function getAll() {
  return db('todos')
}

async function insert(todo) {
  await db('todos').insert(todo, "id")

  return getAll()
}

function delete() {}
function toggleCompleted() {}
function clearCompleted() {}