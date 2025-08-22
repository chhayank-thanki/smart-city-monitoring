const express = require('express');
const router = express.Router();
const { reportIssue, getIssues } = require('../controllers/issueController');

router.post('/report', reportIssue);
router.get('/', getIssues); // for admin use

module.exports = router;
