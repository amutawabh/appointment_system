const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.showAppointments);
router.get('/add', (req, res) => res.render('addAppointment'));
router.post('/add', appointmentController.addAppointment);
router.get('/edit/:id', appointmentController.editAppointment);
router.post('/edit/:id', appointmentController.updateAppointment);
router.get('/delete/:id', appointmentController.deleteAppointment);

module.exports = router;