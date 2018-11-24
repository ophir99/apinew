const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  description: String,
  hashtags: []
});

const model = mongoose.model("tweet", postSchema);

module.exports = model;
