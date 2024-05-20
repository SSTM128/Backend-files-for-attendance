const express = require('express');
const router = express.Router();
const path = require('path');
const Notification = require('../models/notification'); // Ensure this path is correct

// Serve file based on the file path in the database
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);
    if (!notification || !notification.file_path) {
      return res.status(404).json({ message: 'File not found' });
    }

    const filePath = path.join(__dirname, '../', notification.file_path);
    const fileName = path.basename(filePath); // Extract the file name from the path

    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.sendFile(filePath);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
