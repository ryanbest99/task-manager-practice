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

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
