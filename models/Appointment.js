const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  meetingWith: { type: String, required: true },
  datetime: { type: Date, required: true },
  phoneNumber: { type: String, required: true },
  status: { type: String, enum: ['Reserved', 'Attended', 'Did not attend'], default: 'Reserved' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
