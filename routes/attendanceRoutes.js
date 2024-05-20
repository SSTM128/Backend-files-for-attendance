const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController'); // Ensure this path is correct

// Define the routes

// Retrieve all attendance records
router.get('/', attendanceController.getAttendances);
// Add a new attendance record
router.post('/', attendanceController.addAttendance);
// Update an existing attendance record
router.put('/', attendanceController.updateAttendance);

module.exports = router;
