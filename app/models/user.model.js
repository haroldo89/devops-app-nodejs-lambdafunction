const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String },
  password: { type: String },
  token: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);