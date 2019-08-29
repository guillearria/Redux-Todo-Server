const express = require("express")

const todos = require("../todo/todoModel")

const router = express.Router()

router.get("/", async (req,res) => {
  try {
    const todos = await todos.getAll()
    
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: "Server Error"})
  }
})

router.post("/", async (req, res) => {
  
})