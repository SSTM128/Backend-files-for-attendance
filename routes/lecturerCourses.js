const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Ensure this path is correct

router.get('/:lecturer_id', async (req, res) => {
  const { lecturer_id } = req.params;

  try {
    const courses = await Course.find({ lecturer_id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
