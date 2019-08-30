const db = require("../data/dbConfig.js");

const Todo = require("./todoModel.js");

describe("todoModel.js", () => {
  beforeEach(async () => {
    await db("todos").truncate(); // Clears DB before each test
    console.log('inside before each')
  });

  describe("insert()", () => {
    it("should add a todo item into the db", async () => {
      await Todo.insert({ item: "Clean out garage" });

      const todos = await db("todos");

      expect(todos).toHaveLength(1);
    });

    it("should add multiple todo items into the db", async () => {
      await Todo.insert({ item: "Clean out garage" });
      await Todo.insert({ item: "Pay parking ticket" });

      const todos = await db("todos");

      expect(todos).toHaveLength(2);
    });

    it("should return object array with new todo item included", async () => {
      const todo = await Todo.insert({ item: "Clean out garage" });

      expect(todo).toEqual([{ id:1, item: "Clean out garage", completed: "false" }]);
    });
  });

  describe('getAll()', () => {
    it('should return empty array if no todo items exist', async () => {
      const todos = await Todo.getAll()

      expect(todos).toHaveLength(0)
    });

    it('should return an array with single todo object', async () => {
      await Todo.insert({ item: "Clean out garage" });

      const todos = await Todo.getAll()

      expect(todos).toHaveLength(1)
    });

    it('should return an array with two todo objects', async () => {
      await Todo.insert({ item: "Clean out garage" });
      await Todo.insert({ item: "Pay parking ticket" });

      const todos = await Todo.getAll()

      expect(todos).toHaveLength(2)
    });

    it("should return todo object array", async () => {
      await Todo.insert({ item: "Clean out garage" });
      await Todo.insert({ item: "Pay parking ticket" });

      const todos = await Todo.getAll()

      expect(todos).toEqual([{ id:1, item: "Clean out garage", completed: "false" }, { id:2, item: "Pay parking ticket", completed: "false" }]);
    });
  });

  describe('remove()', () => {
    it('should remove the todo item with given ID and return empty array', async () => {
      await Todo.insert({ item: "Clean out garage" });

      const todos = await Todo.remove(1)

      expect(todos).toHaveLength(0)
      expect(todos).toEqual([])
    });

    it('should remove the todo item with given ID and return updated object array', async () => {
      await Todo.insert({ item: "Clean out garage" });
      await Todo.insert({ item: "Pay parking ticket" });

      const todos = await Todo.remove(2)

      expect(todos).toHaveLength(1)
      expect(todos).toEqual([{ id:1, item: "Clean out garage", completed: "false" }])
    });
  });

  describe('toggleCompleted()', () => {
    it('should toggle the completed flag of todo object to completed', async () => {
      await Todo.insert({ item: "Clean out garage" });

      const todo = await Todo.toggleCompleted(1)

      expect(todo).toEqual([{ id:1, item: "Clean out garage", completed: "true" }]);
    });
    
    it('should toggle the completed flag of given object ID to false', async () => {
      await Todo.insert({ item: "Clean out garage" });

      await Todo.toggleCompleted(1)
      const todo = await Todo.toggleCompleted(1)

      expect(todo).toEqual([{ id:1, item: "Clean out garage", completed: "false" }]);
    });
  });

  describe('clearCompleted()', () => {
    it('should remove all completed todo items and return updated array', async () => {
      await Todo.insert({ item: "Clean out garage" });
      await Todo.insert({ item: "Pay parking ticket" });
      await Todo.insert({ item: "Buy groceries" });

      await Todo.toggleCompleted(1)
      await Todo.toggleCompleted(3)

      const todos = await Todo.clearCompleted()

      expect(todos).toEqual([{ id:2, item: "Pay parking ticket", completed: "false" }])
    });
  });
});
