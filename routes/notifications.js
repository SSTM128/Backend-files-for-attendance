const express = require('express');
const router = express.Router();
const Notification = require('../models/notification'); // Ensure this path is correct

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
