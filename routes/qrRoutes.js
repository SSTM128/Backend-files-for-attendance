const express = require('express');
const router = express.Router();
const QRCode = require('../models/qrCode'); // Ensure this path is correct
const Attendance = require('../models/attendance'); // Ensure this path is correct

// Generate a passcode and update it in the database
router.post('/generate/:course_id', async (req, res) => {
  const { course_id } = req.params;
  const { validity_period, date } = req.body; // Get the validity period and date from the request body

  // Generate a random passcode (e.g., 6 characters long)
  const generatePasscode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let passcode = '';
    for (let i = 0; i < 6; i++) {
      passcode += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return passcode;
  };

  const passcode = generatePasscode();
  const validityStartTime = new Date(); // Set the start time to now
  const validityEndTime = new Date(validityStartTime.getTime() + validity_period * 60 * 1000); // Add validity period in minutes

  // Format the date to YYYY/MM/DD
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const formattedDate = formatDate(date);

  try {
    // Check if a QR code record exists for the given course_id
    const existingQRCode = await QRCode.findOne({ course_id: course_id });

    if (existingQRCode) {
      // Update the existing record
      existingQRCode.code_value = passcode;
      existingQRCode.validity_start_time = validityStartTime.toISOString();
      existingQRCode.validity_end_time = validityEndTime.toISOString();

      await existingQRCode.save();
    } else {
      return res.status(404).json({ message: 'QR code record for the specified course_id not found' });
    }

    // Set all students who haven't scanned to 'absent' if their status is not 'attended'
    const attendanceRecords = await Attendance.find({ course_id: course_id });

    for (const record of attendanceRecords) {
      const attendanceEntry = record.attendances.find(a => a.date === formattedDate);

      if (attendanceEntry && attendanceEntry.status !== 'attended') {
        attendanceEntry.status = 'absent';
      } else if (!attendanceEntry) {
        // If no attendance entry for that date, add it as 'absent' without _id
        record.attendances.push({ date: formattedDate, status: 'absent' });
      }

      // Remove _id field from all attendances that do not already have an _id
      record.attendances = record.attendances.map(att => {
        if (!att._id) {
          return { date: att.date, status: att.status };
        }
        return att;
      });

      await record.save();
    }

    res.json({ passcode: passcode });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
