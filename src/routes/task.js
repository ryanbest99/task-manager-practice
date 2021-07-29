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

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(400).send();
    }

    res.status(200).send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
