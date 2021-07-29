require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MONGODB CONNECTED"))
  .catch((err) => console.log(err));
