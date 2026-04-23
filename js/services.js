let selectedService = '';
let price = 0;

$(function () {

    // NAV
    $(window).on('scroll', function () {
        $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 50);
    });

    // SCROLL
    $('a[href^="#"], #navBookBtn').on('click', function (e) {
        e.preventDefault();
        const target = $(this).attr('href') || '#booking';

        if ($(target).length) {
            $('html, body').animate({
                scrollTop: $(target).offset().top - 60
            }, 500);
        }
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

    // SERVICE SELECT
    $(document).on('click', '.service-card', function (e) {
        e.preventDefault();

        $('.service-card').removeClass('selected');
        $(this).addClass('selected');

        selectedService = $(this).data('value');
        price = Number($(this).data('price'));

        $('#nextToStep2').prop('disabled', false);
    });

    // SUBMIT
    $('#submitBooking').on('click', function () {
        $('#step3').addClass('hidden');
        $('#success').removeClass('hidden');
    });

    // RESET
    $('#resetBooking').on('click', function () {
        location.reload();
    });

});

/* ── Scroll-reveal for service rows ── */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.service-row').forEach(row => observer.observe(row));

document.getElementById('footer-year').textContent = new Date().getFullYear();


/* ── Booking form: step transitions with focus management ── */
const progressAnnounce = document.getElementById('form-progress');

function showStep(hideId, showId, progStep, message) {
    document.getElementById(hideId).classList.add('hidden');
    const next = document.getElementById(showId);
    next.classList.remove('hidden');

    const heading = next.querySelector('h2');
    if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
    }

    document.querySelectorAll('.progress-step').forEach((el, i) => {
        el.classList.toggle('active', i + 1 <= progStep);
    });

    progressAnnounce.textContent = message;
}

document.getElementById('nextToStep2').addEventListener('click', () => {
    if (!selectedService) return;
    showStep('step1', 'step2', 2, 'Step 2 of 3: Enter your details.');
});

document.getElementById('backToStep1').addEventListener('click', () =>
    showStep('step2', 'step1', 1, 'Step 1 of 3: Choose an experience.'));

document.getElementById('nextToStep3').addEventListener('click', () => {
  const firstName = document.getElementById('firstName').value.trim();
  const email     = document.getElementById('email').value.trim();
  const bookDate  = document.getElementById('bookDate').value;
  const guests    = document.getElementById('guests').value;
  const errorBox = document.getElementById('step2-error');

  errorBox.classList.add('hidden');

  if (!firstName) {
    errorBox.textContent = 'Please enter your first name.';
    errorBox.classList.remove('hidden');
    return;
  }

  const emailResult = isValidEmail(email);
  if (!emailResult.valid) {
    errorBox.textContent = emailResult.message;
    errorBox.classList.remove('hidden');
    return;
  }

  if (!bookDate) {
    errorBox.textContent = 'Please select a date.';
    errorBox.classList.remove('hidden');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  if (bookDate < today) {
    errorBox.textContent = 'Please select a future date.';
    errorBox.classList.remove('hidden');
    return;
  }

  if (!guests) {
    errorBox.textContent = 'Please select the number of guests.';
    errorBox.classList.remove('hidden');
    return;
  }

  const total = price * Number(guests);
  document.getElementById('sumService').textContent = selectedService;
  document.getElementById('sumPrice').textContent   = '£' + total;
  document.getElementById('sumName').textContent    = firstName;
  document.getElementById('sumDate').textContent    = bookDate;
  document.getElementById('sumGuests').textContent  = guests;

  showStep('step2', 'step3', 3, 'Step 3 of 3: Review your booking summary.');
});

document.getElementById('backToStep2').addEventListener('click', () =>
    showStep('step3', 'step2', 2, 'Step 2 of 3: Enter your details.'));