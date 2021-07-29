const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is not valid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 7) {
        throw new Error("Password Length must be longer than 6");
      } else if (value.toLowerCase().includes("password")) {
        throw new Error("You must NOT include 'password' in your password ");
      }
    },
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
