const User = require('../models/User');

// Middleware to check if the user is an admin
module.exports = (req, res, next) => {
  if (req.session && req.session.userId) {
    User.findById(req.session.userId).then(user => {
      if (user && user.role === 'admin') {
        next(); // Proceed if user is admin
      } else {
        res.status(403).send('Access denied'); // Forbidden if not admin
      }
    }).catch(err => {
      res.status(500).send('Server error');
    });
  } else {
    res.redirect('/users/login'); // Redirect to login if not authenticated
  }
};
