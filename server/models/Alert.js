const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  type: String,
  message: String,
  timestamp: Date,
});

module.exports = mongoose.model("Alert", alertSchema);
