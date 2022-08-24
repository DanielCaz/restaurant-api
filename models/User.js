const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tables: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
