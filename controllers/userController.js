// controllers/userController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

// تسجيل الدخول
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid username or password');
    }

    req.session.userId = user._id;
    req.session.role = user.role;

    res.redirect('/appointments');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// إنشاء مستخدم جديد
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// الحصول على جميع المستخدمين
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render('userManagement', { users }); // تأكد من تمرير المستخدمين إلى العرض
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// تحديث مستخدم
exports.updateUser = async (req, res) => {
  const { id, role } = req.body;

  try {
    await User.findByIdAndUpdate(id, { role });
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// حذف مستخدم
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.redirect('/users');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
