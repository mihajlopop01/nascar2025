require('dotenv').config();
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const workerRoutes = require('./routes/worker');
const adminRoutes = require('./routes/admin');
const auditorRoutes = require('./routes/auditor');
 

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
//Konekcija na bazy
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Rute
app.use('/auth', authRoutes);
app.use('/worker', workerRoutes);
app.use('/admin', adminRoutes);
app.use('/auditor', auditorRoutes);
app.use('/api', authRoutes);


app.listen(3000, () => {
  console.log('Server running on port 3000');
});