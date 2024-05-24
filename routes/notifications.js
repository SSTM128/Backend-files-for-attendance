const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Notification = require('../models/notification'); // Ensure this path is correct

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store files
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    cb(null, `${timestamp}${extension}`); // Filename: timestamp + original extension
  }
});

const upload = multer({ storage: storage });

// Helper function to format date as YYYY-MM-DD
const formatDateAsString = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObj.getDate().toString().padStart(2, '0');
  return `${year}/${month}/${day}`;
};

// Create a notification
router.post('/', upload.single('file'), async (req, res) => {
  const { recipient_id, sender_id, message, date_sent, course_id } = req.body;
  let file_path = null;

  try {
    // Use the helper function to format the date as a string
    const notificationDate = date_sent ? formatDateAsString(date_sent) : formatDateAsString(new Date());

    // Check if a file is uploaded
    if (req.file) {
      file_path = path.join('uploads', req.file.filename);
    }

    const newNotification = new Notification({
      recipient_id,
      sender_id,
      message,
      date_sent: notificationDate,
      course_id,
      file_path // Add file path to the notification document if a file was uploaded
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

// Serve uploaded files
router.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../uploads', filename);
  res.sendFile(filePath);
});


// Delete a notification by notification_id
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
