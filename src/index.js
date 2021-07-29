const express = require("express");
const app = express();
require("./db/mongoose");

app.use(express.json());

const port = 5000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
