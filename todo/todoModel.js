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
  const { completed } = await db("todos").where({ id }).first()
  // Could be converted into getById()

  await db("todos")
    .where({ id })
    .update({
      completed: (completed === "false" ? "true" : "false")
    })

  return getAll();
}

async function clearCompleted() {
  await db("todos")
    .where({ completed: "true" })
    .del()

  return getAll();
}
