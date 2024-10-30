// controllers/appointmentController.js
const Appointment = require('../models/Appointment');

// عرض صفحة تعديل الموعد
exports.editAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).send('Appointment not found');
    }
    res.render('editAppointment', { appointment });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// تحديث الموعد
exports.updateAppointment = async (req, res) => {
  const { status } = req.body;
  try {
    await Appointment.findByIdAndUpdate(req.params.id, { status });
    res.redirect('/appointments');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// إضافة موعد جديد
exports.addAppointment = async (req, res) => {
  const { name, meetingWith, datetime, phoneNumber, status } = req.body;

  try {
    const newAppointment = new Appointment({
      name,
      meetingWith,
      datetime,
      phoneNumber,
      status,
    });

    await newAppointment.save();
    res.redirect('/appointments');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// الحصول على جميع المواعيد
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.render('appointments', { appointments });
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// حذف موعد
exports.deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    await Appointment.findByIdAndDelete(id);
    res.redirect('/appointments');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
