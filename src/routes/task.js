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

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }
  try {
    //     const task = await Task.findByIdAndUpdate(
    //       req.params.id,
    //       { $set: req.body },
    //       { new: true }
    //     );

    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    if (!task) {
      return res.status(404).send();
    }

    res.status(200).send(task);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
