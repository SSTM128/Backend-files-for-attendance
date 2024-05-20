const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController'); // Ensure this path is correct

// Retrieve attendance records for a specific course taught by a lecturer
router.get('/:lecturer_id/:course_id', attendanceController.getAttendances);

module.exports = router;
