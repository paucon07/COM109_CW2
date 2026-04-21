$(function () {

  let selectedService = '';
  let price = 0;

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

  // SERVICE SELECT
  $(document).on('click', '.service-card', function (e) {
    e.preventDefault();

    $('.service-card').removeClass('selected');
    $(this).addClass('selected');

    selectedService = $(this).data('value');
    price = Number($(this).data('price'));

    $('#nextToStep2').prop('disabled', false);
  });

  // STEP NAVIGATION
  function goTo(step) {
    $('#step1, #step2, #step3, #success').addClass('hidden');
    $('#step' + step).removeClass('hidden');
  }

  $('#nextToStep2').on('click', function () {
    if (!selectedService) return;
    goTo(2);
  });

  $('#backToStep1').on('click', function () {
    goTo(1);
  });

  $('#nextToStep3').on('click', function () {
    if (!$('#firstName').val() || !$('#email').val() || !$('#bookDate').val() || !$('#guests').val()) return;

    const guests = Number($('#guests').val());
    const total = price * guests;

    $('#sumService').text(selectedService);
    $('#sumPrice').text("£" + total);

    goTo(3);
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

 // booking
     /* ── Scroll-reveal for service rows ── */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once only
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.service-row').forEach(row => observer.observe(row));

    document.getElementById('footer-year').textContent = new Date().getFullYear();

    /* ── Hamburger nav toggle ── */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu   = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
      navMenu.classList.toggle('open', !isOpen);
    });

    // Close menu when a nav link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        navMenu.classList.remove('open');
      });
    });

    // Close menu on Escape key and return focus to toggle button
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        navMenu.classList.remove('open');
        navToggle.focus();
      }
    });

    /* ── Booking form: step transitions with focus management ── */
    const progressAnnounce = document.getElementById('form-progress');

    function showStep(hideId, showId, progStep, message) {
      document.getElementById(hideId).classList.add('hidden');
      const next = document.getElementById(showId);
      next.classList.remove('hidden');

      // Move focus to heading of the new step so keyboard/screen reader users are oriented
      const heading = next.querySelector('h2');
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus();
      }

      // Update visual progress dots
      document.querySelectorAll('.progress-step').forEach((el, i) => {
        el.classList.toggle('active', i + 1 <= progStep);
      });

      // Announce step change to screen readers via the live region
      progressAnnounce.textContent = message;
    }

    document.getElementById('nextToStep2').addEventListener('click', () =>
      showStep('step1', 'step2', 2, 'Step 2 of 3: Enter your details.'));

    document.getElementById('backToStep1').addEventListener('click', () =>
      showStep('step2', 'step1', 1, 'Step 1 of 3: Choose an experience.'));

    document.getElementById('nextToStep3').addEventListener('click', () =>
      showStep('step2', 'step3', 3, 'Step 3 of 3: Review your booking summary.'));

    document.getElementById('backToStep2').addEventListener('click', () =>
      showStep('step3', 'step2', 2, 'Step 2 of 3: Enter your details.'));
