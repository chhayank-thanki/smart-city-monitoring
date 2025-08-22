const Issue = require('../models/Issue');

// POST /api/issues
exports.reportIssue = async (req, res) => {
  try {
    const issue = new Issue(req.body);
    await issue.save();
    res.status(201).json({ message: 'Issue reported successfully' });
  } catch (error) {
    console.error("Error reporting issue:", error);
    res.status(500).json({ message: 'Failed to report issue' });
  }
};

// GET /api/issues (for admin side later)
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ timestamp: -1 });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch issues' });
  }
};
