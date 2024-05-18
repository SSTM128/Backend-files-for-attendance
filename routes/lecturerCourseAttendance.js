const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController'); // Ensure this path is correct

router.get('/:lecturer_id/:course_id', attendanceController.getAttendances);

module.exports = router;
