const Attendance = require('../models/attendance');
const Student = require('../models/student');
const Course = require('../models/course');

exports.getAttendances = async (req, res) => {
  const { lecturer_id, course_id } = req.params;

  try {
    const pipeline = [
      {
        $match: { course_id: course_id }
      },
      {
        $lookup: {
          from: 'COURSE',
          localField: 'course_id',
          foreignField: 'course_id',
          as: 'course_details'
        }
      },
      { $unwind: { path: '$course_details' } },
      {
        $match: { 'course_details.lecturer_id': lecturer_id }
      },
      {
        $lookup: {
          from: 'STUDENT',
          localField: 'student_id',
          foreignField: 'student_id',
          as: 'student_details'
        }
      },
      { $unwind: { path: '$student_details' } },
      {
        $project: {
          student_id: 1,
          name: '$student_details.name',
          attendances: 1,
          student_department: '$student_details.department',
          student_email: '$student_details.email',
          absent_count: {
            $size: {
              $filter: {
                input: '$attendances',
                as: 'attendance',
                cond: { $eq: ['$$attendance.status', 'absent'] }
              }
            }
          }
        }
      }
    ];

    const records = await Attendance.aggregate(pipeline).exec();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.addAttendance = async (req, res) => {
  try {
    const newRecord = new Attendance(req.body);
    const savedRecord = await newRecord.save();
    res.json(savedRecord);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

exports.updateAttendance = async (req, res) => {
  const { student_id, course_id, date, status } = req.body;

  try {
    const record = await Attendance.findOne({ student_id: student_id, course_id: course_id });
    if (record) {
      const attendance = record.attendances.find(a => a.date === date);
      if (attendance) {
        attendance.status = status; // Update the status
        await record.save(); // Save the updated record
        res.json({ success: true, message: 'Attendance updated successfully', data: record });
      } else {
        res.status(404).json({ success: false, message: 'Attendance record for the specified date not found' });
      }
    } else {
      res.status(404).json({ success: false, message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
