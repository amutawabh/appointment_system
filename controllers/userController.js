const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  res.render('login');
};

exports.authenticate = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and Password are required.');
  }

  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user._id;
      res.redirect('/appointments');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send('Error during authentication');
  }
};
