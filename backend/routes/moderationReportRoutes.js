const express = require('express');
const router = express.Router();
const {
    createModerationReport,
    getModerationReports,
    updateModerationReport
} = require('../controller/moderationReportController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// User route to create a report
router.post('/', verifyToken, createModerationReport);

// Admin routes to manage reports
router.get('/admin', verifyToken, isAdmin, getModerationReports);
router.put('/admin/:id', verifyToken, isAdmin, updateModerationReport);

module.exports = router;
