const express = require("express")

const todoModel = require("../todo/todoModel")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/", async (req,res) => {
  try {
    const todos = await todoModel.getAll()
    
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ error: "Server error."})
  }
})

// router.get("/:id", async (req,res) => {
//   try {
//     const todo = await todoModel("todos").where({ id: req.params.id })
    
//     res.status(200).json(todo)
//   } catch (error) {
//     res.status(500).json({ error: "Server error."})
//   }
// })

router.post("/", async (req, res) => {
  try {
    if (req.body.item) {
      const todos = await todoModel.insert(req.body)
  
      res.status(201).json(todos)
    } else {
      res.status(400).json({ error: "Todo item field is required." })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error."})
  }
})

router.put("/:id", async (req, res) => {
  try {
    const todo = await db("todos").where({ id: req.params.id }).first()
    if (todo) {
      const todos = await todoModel.toggleCompleted(req.params.id)
      res.status(200).json(todos)      
    } else {
      res.status(404).json({ error: "Todo item not found." })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error."})
  }
})

module.exports = router;