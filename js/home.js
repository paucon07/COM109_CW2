$(function () {
  // navbar scroll effect
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 50);
  });

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