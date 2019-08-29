const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

// const authRouter = require("./auth/auth-router");
const todoRouter = require("../todo/todoRouter");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

// server.use("/api", authRouter);
server.use("/api/todos", todoRouter);

server.get("/", (req, res) => {
  res.send({ api: "Server OK" })
});

module.exports = server;
