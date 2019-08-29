const express = require("express")

const db = require("../todo/todoModel")

const router = express.Router()

router.get("/", async (req,res) => {
  try {
    const todos = await db.getAll()
    
    res.status(200).json({ todos })
  } catch (error) {
    res.status(500).json({ error: "Server Error"})
  }
})

router.post("/", async (req, res) => {
  try {
    if (req.body.item) {
      const todos = await db.insert()
  
      res.status(201).json({ todos })
    } else {
      res.status(400).json({ error: "Todo name required."})
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error"})
  }
})

module.exports = router;