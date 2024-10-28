const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

router.get('/', auth, appointmentController.getAppointments);
router.post('/add', auth, appointmentController.createAppointment);
router.post('/delete/:id', auth, appointmentController.deleteAppointment);

module.exports = router;
