const express = require('express');
const router = express.Router();
const Notification = require('../models/notification'); // Ensure this path is correct

// Helper function to format date as YYYY-MM-DD
const formatDateAsString = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Create a notification
router.post('/', async (req, res) => {
  const { recipient_id, sender_id, message, date_sent, course_id } = req.body;

  try {
    // Use the helper function to format the date as a string
    const notificationDate = date_sent ? formatDateAsString(date_sent) : formatDateAsString(new Date());

    const newNotification = new Notification({
      recipient_id,
      sender_id,
      message,
      date_sent: notificationDate,
      course_id
    });

    const savedNotification = await newNotification.save();
    res.json(savedNotification);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Retrieve notifications by recipient_id
router.get('/:recipient_id', async (req, res) => {
  const { recipient_id } = req.params;

  try {
    const notifications = await Notification.find({ recipient_id });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
