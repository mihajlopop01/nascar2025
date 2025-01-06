const express = require('express');
const router = express.Router();
const User = require('../model/User');

//Provera autentifikacije
// router.get('/user', (req, res) => {
//   if (req.isAuthenticated()) {
//     console.log('Authenticated user:', req.user);
//     return res.json({ user: req.user });
//   }
//   console.log('User not authenticated');
//   return res.status(401).json({ error: 'Not authenticated' });
// });

// //Logout
// router.get('/logout', (req, res) => {
//     req.logout(() => {
//       res.redirect('http://localhost:5173/');
//     });
//   });

// Funkcija za logovanje usera i redirekciju usera na osnovu role
const handleLoginRedirect = async (req, res) => {
  const user = req.user; // Uzimamo autentifikovanog usera iz requesta

  
  if (!user) {
    return res.status(401).redirect('http://localhost:5173/'); // Ako user nije autentifikovan vracamo ga na login stranicu
  }

  try {
    
    let existingUser = await User.findOne({ googleId: user.id });
    

    if (!existingUser) {
      // Ako user ne postoju u bazi pravimo novog sa default rolom USER
      console.log('Creating new user in the database'); 
      existingUser = await User.create({
        googleId: user.id,
        displayName: user.displayName,
        email: user.emails[0].value, 
        role: 'USER' 
      });
    }
    console.log(existingUser);
    
    req.logIn(existingUser, (loginErr) => {
      if (loginErr) {
        return res.status(500).send('Login error'); // Handle login error
      }
      console.log(existingUser.role);
      
      switch (existingUser.role) {
         
        case 'ADMIN':
          return res.redirect('http://localhost:5173/admin');
        case 'AUDITOR':
          return res.redirect('http://localhost:5173/auditor');
        case 'USER':
          return res.redirect('http://localhost:5173/worker'); 
        default:
          return res.redirect('http://localhost:5173/'); 
      }
    });
  } catch (dbErr) {
    console.error('Database error:', dbErr);
    return res.redirect('http://localhost:5173/'); 
  }
};

module.exports = {
  handleLoginRedirect,

};