const express = require("express")

const db = require("../todo/todoModel")

const router = express.Router()

router.get("/", async (req,res) => {
  try {
    const todos = await db.getAll()
    
    res.status(200).json(todos)
  } catch (error) {
    res.status(500).json({ error: "Server error."})
  }
})

router.post("/", async (req, res) => {
  try {
    if (req.body.item) {
      const todos = await db.insert(req.body)
  
      res.status(201).json(todos)
    } else {
      res.status(400).json({ error: "Todo item field is required." })
    }
  } catch (error) {
    res.status(500).json({ error: "Server error."})
  }
})

router.put("/:id", (req, res) => {
  try {
    const todos = await db.toggleCompleted(req.params.id)

    
  } catch (error) {
    res.status(500).json({ error: "Server error."})
  }
})

module.exports = router;