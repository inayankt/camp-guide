const express = require('express');
const passport = require('passport');

const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const { validateUserReg, validateUserLogin } = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');
const storeReturnTo = require('../middlewares/storeReturnTo');

const router = express.Router();

router.get('/register', (req, res) => {
  res.render('users/register');
});

router.post('/register', validateUserReg, storeReturnTo, catchAsync(async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(user, (err) => {
      if(err) {
        return next(err);
      }
      const redirectUrl = res.locals.returnTo || '/';
      req.flash('success', 'Welcome to CampGuide!');
      res.redirect(redirectUrl);
    });
  } catch(err) {
    req.flash('error', err.message);
    res.redirect('/register');
  }
}));

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', validateUserLogin, storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  const redirectUrl = res.locals.returnTo || '/';
  req.flash('success', 'Welcome back!');
  res.redirect(redirectUrl);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/');
  });
});

module.exports = router;