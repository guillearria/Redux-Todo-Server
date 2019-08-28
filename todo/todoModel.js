const db = require("../data/dbConfig");

module.exports = {
  insert,
  remove,
  getAll,
  toggleCompleted,
  clearCompleted
};

function getAll() {
  return db("todos");
}

async function insert(todo) {
  await db("todos").insert(todo, "id");

  return getAll();
}

async function remove(id) {
  await db("todos")
    .where({ id })
    .del();

  return getAll();
}

function toggleCompleted() {}
function clearCompleted() {}
