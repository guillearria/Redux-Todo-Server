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
    it('should delete the todo item with given ID and return empty array', () => {
      await Todo.insert({ name: "Clean out garage" });

      const todos = Todo.delete(1)

      expect(todos).toHaveLength(0)
    });

    it('should delete the todo item with given ID and return updated array', () => {
      await Todo.insert({ name: "Clean out garage" });
      await Todo.insert({ name: "Pay parking ticket" });

      const todos = Todo.delete(2)

      expect(todos).toHaveLength(1)
      expect(todos).toEqual([{ name: "Clean out garage", completed: "false" }])
    });
  });

  describe('toggleCompleted()', () => {
    it('should toggle the completed flag of given object ID to completed', () => {
      await Todo.insert({ name: "Clean out garage" });

      const todo = Todo.toggleCompleted(1)

      expect(todo).toEqual({ name: "Clean out garage", completed: "true" });
    });
    
    it('should toggle the completed flag of given object ID to false', () => {
      await Todo.insert({ name: "Clean out garage" });

      await Todo.toggleCompleted(1)
      const todo = Todo.toggleCompleted(1)

      expect(todo).toEqual({ name: "Clean out garage", completed: "false" });
    });
  });

  describe('clearCompleted()', () => {
    it('should remove all completed todo items and return updated array', () => {
      await Todo.insert({ name: "Clean out garage" });
      await Todo.insert({ name: "Pay parking ticket" });
      await Todo.insert({ name: "Buy groceries" });

      await Todo.toggleCompleted(1)
      await Todo.toggleCompleted(3)

      const todos = await Todo.clearCompleted()

      expect(todos).toEqual([{ name: "Pay parking ticket", completed: "false" }])
    });
  });
});
