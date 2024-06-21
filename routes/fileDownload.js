const express = require('express');
const router = express.Router();
const Notification = require('../models/notification'); // Ensure this path is correct
const axios = require('axios'); // We'll use axios to fetch the file

// Serve file based on the file path in the database
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const notification = await Notification.findById(id);
    if (!notification || !notification.file_path) {
      return res.status(404).json({ message: 'File not found' });
    }

    const fileUrl = notification.file_path;

    // Fetch the file from Firebase Storage
    const response = await axios.get(fileUrl, {
      responseType: 'stream',
    });

    // Set the headers to force download
    res.setHeader('Content-Disposition', `attachment; filename=${notification.file_path.split('/').pop()}`);
    res.setHeader('Content-Type', response.headers['content-type']);

    // Pipe the file stream to the response
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
