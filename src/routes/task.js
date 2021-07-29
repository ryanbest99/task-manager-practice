const express = require("express");
const Task = require("../models/Task");
const router = new express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const newTask = await new Task(req.body).save();

    res.status(200).send(newTask);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
