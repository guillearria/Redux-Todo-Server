const request = require("supertest"); // << install this as -D

const server = require("./server.js"); // << the System Under Test (SUT)

const Todo = require("./todoModel.js");

describe("todoRouter.js", () => {
  beforeEach(async () => {
    await db("todos").truncate(); // Clears DB before each test
  });

  it("should be using testing db environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("POST /api/todos", () => {
    it("should return 201 CREATED", () => {
      return request(server)
        .post("/api/todos")
        .send({ item: "Clean out garage" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });

    it("should return data in JSON", () => {
      return request(server)
        .post("/api/todos")
        .send({ item: "Clean out garage" })
        .then(res => {
          expect(res.type).toMatch(/json/);
          expect(res.type).toBe("application/json");
        });
    });

    it("should return todo object as the body", () => {
      return request(server)
        .post("/api/todos")
        .send({ item: "Clean out garage" })
        .then(res => {
          expect(res.body).toEqual({
            id: 1,
            item: "Clean out garage",
            completed: "false"
          });
        });
    });
  });

  describe("GET /api/todos", () => {
    it("should return 200 OK", () => {
      return request(server)
        .get("/api/todos")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return data in JSON", () => {
      return request(server)
        .get("/api/todos")
        .then(res => {
          expect(res.type).toMatch(/json/);
          expect(res.type).toBe("application/json");
        });
    });

    it("should return an empty array as the body", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual([]);
        });
    });

    it("should return an array with todo objects as the body", async () => {
      await Todo.insert({ item: "Clean out garage" });
      await Todo.insert({ item: "Pay parking ticket" });

      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual([
            { id: 1, item: "Clean out garage", completed: "false" },
            { id: 2, item: "Pay parking ticket", completed: "false" }
          ]);
        });
    });
  });
});
