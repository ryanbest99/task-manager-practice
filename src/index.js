const express = require("express");
const app = express();
require("./db/mongoose");
const User = require("./models/User");

app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const newUser = await new User(req.body);
    await newUser.save();
    res.status(200).send(newUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send();
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send();
  }
});

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  console.log(updates);
  const allowedUpdates = ["username", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates" });
  }

  try {
    //     const user = await User.findByIdAndUpdate(
    //       req.params.id,
    //       { $set: req.body },
    //       { new: true }
    //     );
    const user = await User.findById(req.params.id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (err) {
    res.status(400).send();
  }
});

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
