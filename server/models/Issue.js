const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  name: String,
  email: String,
  location: String,
  description: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Issue', issueSchema);
