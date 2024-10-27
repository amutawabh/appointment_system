const Appointment = require('../models/Appointment');

exports.showAppointments = async (req, res) => {
    const appointments = await Appointment.find();
    res.render('appointments', { appointments });
};

exports.addAppointment = async (req, res) => {
    const { name, meetingWith, datetime, phoneNumber, status } = req.body;
    const appointment = new Appointment({ name, meetingWith, datetime, phoneNumber, status });
    await appointment.save();
    res.redirect('/appointments');
};

exports.deleteAppointment = async (req, res) => {
    await Appointment.findByIdAndDelete(req.params.id);
    res.redirect('/appointments');
};

exports.editAppointment = async (req, res) => {
    const appointment = await Appointment.findById(req.params.id);
    res.render('editAppointment', { appointment });
};

exports.updateAppointment = async (req, res) => {
    await Appointment.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/appointments');
};