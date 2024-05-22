const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QRCodeSchema = new Schema({
  qr_id: { type: String, unique: true, required: true },
  code_value: { type: String, required: true },
  course_id: { type: String, required: true },
  validity_start_time: { type: Date, required: true },
  validity_end_time: { type: Date, required: true }
}, { collection: 'QR_CODE' });

module.exports = mongoose.model('QRCode', QRCodeSchema);
