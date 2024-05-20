const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  notification_id: { type: String, unique: true, default: function() { return this._id.toString(); } },
  recipient_id: { type: String, required: true },
  sender_id: { type: String, required: true },
  message: { type: String, required: true },
  date_sent: { type: String, required: true }, // Ensure date is stored as string
  course_id: { type: String, required: true },
  file_path: { type: String } // Add file_path field
}, { collection: 'NOTIFICATION' });

module.exports = mongoose.model('Notification', NotificationSchema);
