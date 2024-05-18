const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true }
}, { collection: 'LECTURER' }); // Specify the correct collection name

module.exports = mongoose.model('Lecturer', LecturerSchema);
