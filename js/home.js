$(function () {

  //skip link functionality
  $('.skip-link').on('click', function () {
    $('#main-content').focus();
  });

  // scroll reveal animation
  function revealOnScroll() {
    $('.reveal').each(function () {
      const elementTop = $(this).offset().top;
      const windowBottom = $(window).scrollTop() + $(window).height();

      if (windowBottom > elementTop + 100) {
        $(this).addClass('visible');
      }
    });
  }

  $(window).on('scroll', revealOnScroll);
  revealOnScroll();

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

  // hero fade up
  const hero = $('.hero-content');
  hero.css({ opacity: 0, transform: 'translateY(30px)', transition: 'all 0.8s ease' });
  setTimeout(() => {
    hero.css({ opacity: 1, transform: 'translateY(0)' });
  }, 200);

  // smooth scroll
  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    const target = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(target).offset().top - 80 }, 500);
  });

  // slideshow
  const slides = $('.slide');
  slides.removeClass('active').eq(0).addClass('active');
  let slideIndex = 1;
  function showSlide() {
    slides.removeClass('active').eq(slideIndex).addClass('active');
    slideIndex = (slideIndex + 1) % slides.length;
  }
  showSlide();
  setInterval(showSlide, 3000);

  // continuous scroll
  const inner = document.querySelector('.reviews-inner');
if (inner) {

  if (!inner.dataset.duplicated) { // make sure this only runs once
  inner.innerHTML += inner.innerHTML;
  inner.dataset.duplicated = "true";
  }

  let x = 0;
  const speed = 0.2; // pixels per frame

  function scrollLoop() {
    x -= speed;
    if (Math.abs(x) >= inner.scrollWidth / 2) x = 0; // reset halfway
    inner.style.transform = `translateX(${x}px)`;
    requestAnimationFrame(scrollLoop);
  }

  scrollLoop();
}
});