const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({
  student_id: { type: String, required: true },
  course_id: { type: String, required: true },
  attendances: [
    {
      date: { type: String, required: true },
      status: { type: String, required: true, enum: ['attended', 'absent', 'excused'] }
    }
  ]
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
