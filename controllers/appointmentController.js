const Appointment = require('../models/Appointment');

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.render('appointments', { appointments });
  } catch (error) {
    res.status(500).send('Error retrieving appointments');
  }
};

exports.createAppointment = async (req, res) => {
  const { name, meetingWith, datetime, phoneNumber, status } = req.body;

  if (!name || !meetingWith || !datetime || !phoneNumber) {
    return res.status(400).send('All fields are required.');
  }

  try {
    const newAppointment = new Appointment({ name, meetingWith, datetime, phoneNumber, status });
    await newAppointment.save();
    res.redirect('/appointments');
  } catch (error) {
    res.status(500).send('Error creating appointment');
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.redirect('/appointments');
  } catch (error) {
    res.status(500).send('Error deleting appointment');
  }
};
