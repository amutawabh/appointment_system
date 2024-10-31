// server.js
const express = require('express'); //express
const mongoose = require('mongoose'); //DB
const session = require('express-session'); //express
const MongoStore = require('connect-mongo'); //BD
const dotenv = require('dotenv'); //.env
const path = require('path'); // path
dotenv.config(); //.env
const app = express(); // express

// Middleware Access
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// middleware configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Set view engine to EJS 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// CSS Publice
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
app.use('/appointments', appointmentRoutes);
app.use('/users', userRoutes);

// Form route Home page is / login page 
app.get('/', (req, res) => {
  res.redirect('/users/login');
});

// runing server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
