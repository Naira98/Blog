const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    requried: true,
  },
  password: {
    type: String,
    requried: true,
  },
  name: {
    type: String,
    requried: true,
  },
  status: {
    type: Object,
    default: 'I am new!',
  },
  posts: {
    type: Schema.Types.Array,
    ref: "Post",
  },
});

module.exports = mongoose.model("User", userSchema);
