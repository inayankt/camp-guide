isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    req.flash('error', 'Cannot continue without logging you in.');
    if(req.originalUrl !== '/logout') {
      req.session.returnTo = req.originalUrl;
    }
    return res.redirect('/login');
  }
  next();
};

module.exports = isLoggedIn;