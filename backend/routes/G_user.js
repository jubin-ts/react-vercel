// const express = require('express');
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const {GoogleAuth} = require('google-auth-library')

// // Import controller functions
// const { G_signupUser, G_loginUser } = require('../controllers/G_userController');

// const router = express.Router();

// // Google authentication route
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// // Google authentication callback route
// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect to homepage or wherever you want to redirect
//     res.redirect('http://localhost:3000/home');
//   }
// );

// // Login route
// router.post('/login', G_loginUser);

// // Signup route
// router.post('/signup', G_signupUser);

// module.exports = router;