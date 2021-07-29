const express = require("express");
const app = express();
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
