const express = require('express');
const router = express.Router();
const Notification = require('../models/notification'); // Ensure this path is correct

// Serve file based on the file path in the database
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);
    if (!notification || !notification.file_path) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileUrl = notification.file_path;

    // Redirect the client to the public URL of the file in Firebase Storage
    res.redirect(fileUrl);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
