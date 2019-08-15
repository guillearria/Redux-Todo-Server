const db = require("../data/dbConfig.js");

const Todo = require("./todoModel.js");

describe("todoModel.js", () => {
  beforeEach(async () => {
    await db("todos").truncate(); // Clears DB before each test
  });

  describe("insert()", () => {
    it("should add a todo item into the db", async () => {
      await Todo.insert({ name: "Clean out garage" });

      const todos = await db("todos");

      expect(todos).toHaveLength(1);
    });

    it("should add multiple todo items into the db", async () => {
      await Todo.insert({ name: "Clean out garage" });
      await Todo.insert({ name: "Pay parking ticket" });

      const todos = await db("todos");

      expect(todos).toHaveLength(2);
    });

    it("should return object with name and completed status", async () => {
      const todo = await Todo.insert({ name: "Clean out garage" });

      expect(todo).toEqual({ name: "Clean out garage", completed: "false" });
    });
  });

  describe('getAll()', () => {
    it('should return empty array if no todo items exist', () => {
      const todos = await Todo.getAll()

      expect(todos).toHaveLength(0)
    });

    it('should return an array with single todo object', () => {
      await Todo.insert({ name: "Clean out garage" });

      const todos = await Todo.getAll()

      expect(todos).toHaveLength(1)
    });

    it('should return an array with two todo objects', () => {
      await Todo.insert({ name: "Clean out garage" });
      await Todo.insert({ name: "Pay parking ticket" });

      const todos = await Todo.getAll()

      expect(todos).toHaveLength(2)
    });
  });

  describe('delete()', () => {
    it('should delete the todo item with given ID', () => {
      await Todo.insert({ name: "Clean out garage" });

      const todo = 
    });
  });

  describe('toggleCompleted()', () => {
    
  });

  describe('clearCompleted', () => {
    
  });
});
