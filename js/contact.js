const form = document.getElementById('contactForm');
const errorBox = document.getElementById('contact-error');
const successBox = document.getElementById('contact-success');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = document.getElementById('fullName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const phone   = document.getElementById('contactPhone').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  errorBox.classList.add('hidden');

  if (!name || !email || !subject || !message) {
    errorBox.textContent = 'Please fill in all required fields.';
    errorBox.classList.remove('hidden');
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const emailResult = isValidEmail(email);
  if (!emailResult.valid) {
    errorBox.textContent = emailResult.message;
    errorBox.classList.remove('hidden');
    return;
  }

  const phoneResult = isValidPhone(phone, true);
  if (!phoneResult.valid) {
    errorBox.textContent = phoneResult.message;
    errorBox.classList.remove('hidden');
    return;
  }

  form.classList.add('hidden');
  successBox.classList.remove('hidden');
  successBox.focus();
});

document.getElementById('resetContact').addEventListener('click', function () {
  form.reset();
  form.classList.remove('hidden');
  successBox.classList.add('hidden');
  document.getElementById('fullName').focus();
});

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