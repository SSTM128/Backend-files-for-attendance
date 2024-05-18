const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance'); // Ensure this path is correct
const Student = require('../models/student'); // Ensure this path is correct

router.get('/:course_id', async (req, res) => {
  const { course_id } = req.params;

  try {
    // Find attendance records for the given course
    const attendanceRecords = await Attendance.find({ course_id });

    // Enrich attendance records with student details
    const enrichedRecords = await Promise.all(attendanceRecords.map(async record => {
      const student = await Student.findOne({ student_id: record.student_id });
      return {
        student_id: record.student_id,
        student_name: student ? student.name : 'Unknown',
        attendances: record.attendances
      };
    }));

    res.json(enrichedRecords);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
