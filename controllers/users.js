const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register', { docTitle: 'Register' });
};

module.exports.registerNewUser = async (req, res, next) => {
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
};

module.exports.renderLoginForm = (req, res) => {
  res.render('users/login', { docTitle: 'Login' });
};

module.exports.loginUser = (req, res) => {
  const redirectUrl = res.locals.returnTo || '/';
  req.flash('success', 'Welcome back!');
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res) => {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    req.flash('success', 'Goodbye!');
    res.redirect('/');
  });
};