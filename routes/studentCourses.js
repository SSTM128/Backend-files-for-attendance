const express = require('express');
const router = express.Router();
const Student = require('../models/student'); // Ensure this path is correct
const Course = require('../models/course'); // Ensure this path is correct

router.get('/:student_id', async (req, res) => {
  const { student_id } = req.params;

  try {
    // Find the student by their student_id
    const student = await Student.findOne({ student_id });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Retrieve the courses based on the course IDs in the student's courses array
    const courses = await Course.find({ course_id: { $in: student.courses } });

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
