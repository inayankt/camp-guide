const navLinks = document.querySelectorAll('.nav-link');

if(window.location.pathname == '/') {
  navLinks[0].classList.add('active');
} else if(window.location.pathname == '/campgrounds') {
  navLinks[1].classList.add('active');
} else if(window.location.pathname == '/campgrounds/new') {
  navLinks[2].classList.add('active');
} else if(window.location.pathname == '/login') {
  navLinks[3].classList.add('active');
} else if(window.location.pathname == '/register') {
  navLinks[4].classList.add('active');
} else if(window.location.pathname == '/logout') {
  navLinks[5].classList.add('active');
}
