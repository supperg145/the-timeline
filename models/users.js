const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 1
  },
  message: {
    type: String,
    required: true,
    minLength: 25
  },
  comments: [commentSchema]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
