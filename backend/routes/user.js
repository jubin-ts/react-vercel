// const express = require ('express')

// // controller functions

// const { signupUser,loginUser }  = require ('../controllers/usercontroller')

// const router = express.Router()

// router.get('/login',loginUser)
// router.get('/signup',signupUser)

// // login route

// router.post('/login',loginUser)

// // signup route

// router.post('/signup',signupUser)

// module.exports = router


const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Import controller functions
const { signupUser, loginUser } = require('../controllers/usercontroller');

const router = express.Router();

// Google authentication route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback route
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect to homepage or wherever you want to redirect
    res.redirect('http://localhost:3000/home');
  }
);

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

module.exports = router;
