const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  { timestamps: true }
);

const userModal = mongoose.model("User", userSchema);
module.exports = userModal