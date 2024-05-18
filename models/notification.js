const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  course_id: { type: String, required: true },
  notification_id: { type: String, required: true, unique: true },
  recipient_id: { type: String, required: true },
  message: { type: String, required: true },
  date_sent: { type: Date, required: true }
  
}, { collection: 'NOTIFICATION' }); // Ensure this matches your collection name

module.exports = mongoose.model('Notification', NotificationSchema);
