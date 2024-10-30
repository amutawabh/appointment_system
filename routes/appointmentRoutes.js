// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// Route add addAppointment links
router.get('/add', auth.isAuthenticated, (req, res) => {
  res.render('addAppointment'); 
});

// Route (POST)
router.post('/add', auth.isAuthenticated, appointmentController.addAppointment);

// Route all appointment
router.get('/', auth.isAuthenticated, appointmentController.getAppointments);

// Route edit
router.get('/edit/:id', auth.isAuthenticated, appointmentController.editAppointment);

// Route update (POST)
router.post('/update/:id', auth.isAuthenticated, appointmentController.updateAppointment);

// Route Delete
router.get('/delete/:id', auth.isAuthenticated, appointmentController.deleteAppointment);

module.exports = router;
