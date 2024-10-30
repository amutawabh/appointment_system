// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Route login
router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', userController.login);

// Route admin
router.get('/', auth.isAdmin, userController.getUsers);
router.post('/create', auth.isAdmin, userController.createUser);
router.post('/update', auth.isAdmin, userController.updateUser);
router.get('/delete/:id', auth.isAdmin, userController.deleteUser);

module.exports = router;
