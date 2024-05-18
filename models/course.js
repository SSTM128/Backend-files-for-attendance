const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  course_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  code: { type: String, required: true },
  lecturer_id: { type: String, required: true }
}, { collection: 'COURSE' }); // Ensure this matches your collection name

module.exports = mongoose.model('Course', CourseSchema);
