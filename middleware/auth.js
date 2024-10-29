// middleware/auth.js

// التحقق من تسجيل الدخول
exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.redirect('/users/login');
  }
};

// التحقق من صلاحيات المشرف
exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.role === 'admin') {
    return next();
  } else {
    res.status(403).send('Access denied. Admins only.');
  }
};
