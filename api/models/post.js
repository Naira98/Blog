const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      requried: true,
    },
    imageUrl: {
      type: String,
      requried: true,
    },
    content: {
      type: String,
      requried: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
