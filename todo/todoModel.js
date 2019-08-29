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

async function toggleCompleted(id) {
  await db("todos")
    .where({ id })
    .update({
      completed: true
    })

  return getAll();
}

async function clearCompleted() {
  await db("todos")
    .where({ completed: true })
    .del()

  return getAll();
}
