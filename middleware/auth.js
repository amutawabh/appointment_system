// middleware/auth.js

// Confirming login

exports.isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.redirect('/users/login');
  }
};

// Access 

exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.role === 'admin') {
    return next();
  } else {
    res.status(403).send('Access denied. Admins only.');
  }
};
