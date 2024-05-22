const express = require('express');
const router = express.Router();
const QRCode = require('../models/qrCode'); // Ensure this path is correct
const Attendance = require('../models/attendance'); // Ensure this path is correct

// Update attendance based on scanned QR code
router.post('/scan', async (req, res) => {
  const { student_id, course_id, date, passcode } = req.body;

  try {
    // Find the QR code record for the given course_id
    const qrRecord = await QRCode.findOne({ course_id: course_id });

    if (!qrRecord) {
      return res.status(404).json({ message: 'QR code record not found for the specified course_id' });
    }

    // Check if the passcode matches
    if (qrRecord.code_value !== passcode) {
      return res.status(400).json({ message: 'Invalid passcode' });
    }

    // Check if the current time is within the validity period
    const currentTime = new Date();
    if (currentTime > new Date(qrRecord.validity_end_time)) {
      return res.status(400).json({ message: 'QR code has expired' });
    }

    // Find the student's attendance record for the given course_id
    const attendanceRecord = await Attendance.findOne({ student_id: student_id, course_id: course_id });

    if (!attendanceRecord) {
      return res.status(404).json({ message: 'Attendance record not found for the specified student_id and course_id' });
    }

    // Find the attendance entry for the specified date
    const attendanceEntry = attendanceRecord.attendances.find(a => a.date === date);

    if (attendanceEntry) {
      // Update the status to 'attended'
      attendanceEntry.status = 'attended';
      await attendanceRecord.save(); // Save the updated record
      res.json({ message: 'Attendance updated successfully' });
    } else {
      res.status(404).json({ message: 'Attendance record for the specified date not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
