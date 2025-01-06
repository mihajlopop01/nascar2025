const express = require('express');
const passport = require('passport');
const UserController = require('../controllers/UserController');
const router = express.Router();

// Passport config
require('../config/passportConfig')(passport);

// Google autentifikacija
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) {
      return next(err); 
    }
    if (!user) {
      return res.redirect('http://localhost:5173/');
    }
     req.user = user;
    // Pozivamo handleLoginRedirect funkciju iz UserControllera
    UserController.handleLoginRedirect(req, res);
  })(req, res, next);
});

//Provera da li je user autentifikovan
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    console.log('Authenticated user:', req.user);
    return res.json({ user: req.user });
  }
  console.log('User not authenticated');
  return res.status(401).json({ error: 'Not authenticated' });
});

//Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
      res.redirect('http://localhost:5173/');
    });
  });

module.exports = router;