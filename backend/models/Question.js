const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

module.exports = mongoose.model("Question", questionSchema);
