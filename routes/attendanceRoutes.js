const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController'); // Ensure this path is correct

// Define the routes
router.get('/', attendanceController.getAttendances);
router.post('/', attendanceController.addAttendance);
router.put('/', attendanceController.updateAttendance);

module.exports = router;
