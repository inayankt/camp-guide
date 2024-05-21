const express = require('express');
const passport = require('passport');

const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const { validateUserReg, validateUserLogin } = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');
const storeReturnTo = require('../middlewares/storeReturnTo');
const { renderRegisterForm, registerNewUser, renderLoginForm,loginUser, logoutUser } = require('../controllers/users');

const router = express.Router();

router.route('/register')
  .get(renderRegisterForm)
  .post(validateUserReg,
        storeReturnTo,
        catchAsync(registerNewUser));

router.route('/login')
  .get(renderLoginForm)
  .post(validateUserLogin,
        storeReturnTo,
        passport.authenticate('local', {
          failureFlash: true,
          failureRedirect: '/login'
        }),
        loginUser);

router.get('/logout',
            isLoggedIn,
            logoutUser);

module.exports = router;