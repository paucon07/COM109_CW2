function expandRoom(element) {
  const isExpanded = element.classList.contains('expanded');

  // collapse any open card
  document.querySelectorAll('.room.expanded').forEach(r => r.classList.remove('expanded'));

  // if it wasn't already open, open it
  if (!isExpanded) {
    element.classList.add('expanded');
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
function scrollToRooms() {
  const target = document.getElementById('rooms-list');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
 // hamburger
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      navMenu.classList.toggle('open', !isOpen);
    });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
       navToggle.setAttribute('aria-expanded', 'false');
       navToggle.setAttribute('aria-label', 'Open navigation menu');
       navMenu.classList.remove('open');
    });
    });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation menu');
      navMenu.classList.remove('open');
      navToggle.focus();
    }
  });
  }
  window.addEventListener('scroll', revealRooms);

function revealRooms() {
  var rooms = document.querySelectorAll('.room');
  
  for (var i = 0; i < rooms.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = rooms[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      rooms[i].classList.add('reveal');
    }
  }
}

revealRooms(); 