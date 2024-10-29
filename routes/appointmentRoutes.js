// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');

// Route لعرض صفحة إضافة موعد جديد
router.get('/add', auth.isAuthenticated, (req, res) => {
  res.render('addAppointment'); // تأكد من وجود addAppointment.ejs في مجلد views
});

// Route لإضافة موعد جديد (POST)
router.post('/add', auth.isAuthenticated, appointmentController.addAppointment);

// Route للحصول على جميع المواعيد
router.get('/', auth.isAuthenticated, appointmentController.getAppointments);

// Route لتحديث موعد
router.post('/update', auth.isAuthenticated, appointmentController.updateAppointment);

// Route لحذف موعد
router.get('/delete/:id', auth.isAuthenticated, appointmentController.deleteAppointment);

module.exports = router;
