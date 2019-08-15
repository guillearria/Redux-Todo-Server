const request = require("supertest"); // << install this as -D

const server = require("./server.js"); // << the System Under Test (SUT)

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
      // rest client and make a get to '/', look at the status code
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return data in JSON", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.type).toMatch(/json/);
          expect(res.type).toBe("application/json");
        });
    });

    it('should return { api: "up" } as the body', () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.body).toEqual({ api: "up" });
          expect(res.body.api).toBe("up");
        });
    });
  });
});
