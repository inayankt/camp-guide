isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Cannot continue without logging in.');
    req.session.returnTo = req.originalUrl;
    return res.redirect('/login');
  }
  next();
};

module.exports = isLoggedIn;