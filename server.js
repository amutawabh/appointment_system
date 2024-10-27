// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const app = express();

dotenv.config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// اتصال مع قاعدة البيانات
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// إعداد express-session
app.use(session({
    secret: process.env.SESSION_SECRET, // المفتاح السري للجلسة، يجب تعريفه في .env
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // اجعلها true إذا كنت تستخدم HTTPS
}));

// Middleware
const authMiddleware = require('./middleware/auth');

// Routes
app.use('/appointments', authMiddleware, require('./routes/appointmentRoutes'));
app.use('/users', require('./routes/userRoutes'));

// Login route
app.get('/', (req, res) => {
    res.render('login', { error: null }); // تمرير error كـ null بشكل افتراضي
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));