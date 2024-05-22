const express = require('express');
const router = express.Router();
const QRCode = require('../models/qrCode'); // Ensure this path is correct

// Generate a passcode and update it in the database
router.post('/generate/:course_id', async (req, res) => {
  const { course_id } = req.params;
  const { validity_period } = req.body; // Get the validity period from the request body

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

  try {
    // Check if a QR code record exists for the given course_id
    const existingQRCode = await QRCode.findOne({ course_id: course_id });

    if (existingQRCode) {
      // Update the existing record
      existingQRCode.code_value = passcode;
      existingQRCode.validity_start_time = validityStartTime.toISOString();
      existingQRCode.validity_end_time = validityEndTime.toISOString();

      const updatedQRCode = await existingQRCode.save();

      res.json({ passcode: passcode });
    } else {
      res.status(404).json({ message: 'QR code record for the specified course_id not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
