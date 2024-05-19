const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  notification_id: { type: String, unique: true, default: function() { return this._id.toString(); } },
  recipient_id: { type: String, required: true },
  sender_id: { type: String, required: true },
  message: { type: String, required: true },
  date_sent: { type: String, required: true }, // Change date_sent to String
  course_id: { type: String, required: true }
}, { collection: 'NOTIFICATION' });

module.exports = mongoose.model('Notification', NotificationSchema);
