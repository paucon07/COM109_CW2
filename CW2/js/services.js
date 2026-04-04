/* Verdana Retreat — scripts.js | Requires jQuery */

$(function () {

  // 1. Navbar scroll state
  const $nb = $('#navbar');
  $(window).on('scroll', function () {
    $nb.toggleClass('scrolled', $(this).scrollTop() > 60);
  });

  // 2. Smooth scroll
  $('a[href^="#"], #navBookBtn').on('click', function (e) {
    const target = $(this).attr('href') || '#booking';
    if (!target || target === '#') return;
    const $t = $(target);
    if ($t.length) { e.preventDefault(); $('html,body').animate({ scrollTop: $t.offset().top - 80 }, 700); }
  });

  // 3. Fade-up on scroll
  $(['.service-content','.service-media','.section-eyebrow','.section-title','.body-text','.feature-list','.strip-item','.gallery-img','.booking-header'].join(',')).addClass('fade-up');

  function checkFades() {
    const bot = $(window).scrollTop() + $(window).height();
    $('.fade-up:not(.visible)').each(function () {
      if (bot > $(this).offset().top + 60) $(this).addClass('visible');
    });
  }
  $(window).on('scroll', checkFades);
  checkFades();

  // 4. Booking system
  let selectedService = '';

  // Pre-select from section buttons
  $('.book-service-btn').on('click', function (e) {
    e.preventDefault();
    preselectService($(this).data('service'));
    $('html,body').animate({ scrollTop: $('#booking').offset().top - 80 }, 700);
  });

  function preselectService(svc) {
    selectedService = svc;
    $('.service-card').removeClass('selected').filter(function () { return $(this).data('value') === svc; }).addClass('selected');
    $('#nextToStep2').prop('disabled', false);
  }

  // Card click
  $(document).on('click', '.service-card', function () {
    $('.service-card').removeClass('selected');
    $(this).addClass('selected');
    selectedService = $(this).data('value');
    $('#nextToStep2').prop('disabled', false);
    const $c = $(this);
    $c.css('transform', 'scale(1.03)');
    setTimeout(function () { $c.css('transform', ''); }, 200);
  });

  // Step navigation
  function goToStep(n) {
    $('.booking-step').addClass('hidden');
    $('#step' + n).removeClass('hidden');
    $('.step').each(function () {
      const s = parseInt($(this).data('step'));
      $(this).removeClass('active done').addClass(s === n ? 'active' : s < n ? 'done' : '');
    });
    $('.step-line').each(function (i) { $(this).toggleClass('done', i < n - 1); });
    $('html,body').animate({ scrollTop: $('.booking-card').offset().top - 100 }, 400);
  }

  $('#nextToStep2').on('click', function () { if (selectedService) goToStep(2); });
  $('#nextToStep3').on('click', function () { if (validateStep2()) { populateSummary(); goToStep(3); } });
  $('#backToStep1').on('click', function () { goToStep(1); });
  $('#backToStep2').on('click', function () { goToStep(2); });

  // Validation
  function validateStep2() {
    let valid = true;
    ['#firstName','#lastName','#email','#bookDate','#guests'].forEach(function (s) {
      const $el = $(s);
      $el.css('border-color', '');
      if (!$el.val().trim()) { $el.css('border-color', '#c0392b'); valid = false; }
    });
    if ($('#email').val().trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val().trim())) {
      $('#email').css('border-color', '#c0392b'); valid = false;
    }
    if (!valid) {
      const $card = $('.booking-card').css('position', 'relative');
      $card.animate({left:'-8px'},60).animate({left:'8px'},60).animate({left:'-5px'},60).animate({left:'5px'},60).animate({left:'0'},60);
    }
    return valid;
  }

  $('input,select,textarea').on('input change', function () { $(this).css('border-color', ''); });

  // Summary
  function populateSummary() {
    const guests = $('#guests').val();
    const price  = parseFloat($('.service-card.selected').data('price')) || 0;
    const total  = (price * (parseInt(guests) || 1)).toFixed(2);
    const date   = $('#bookDate').val();
    let dateStr  = '—';
    if (date) dateStr = new Date(date + 'T00:00:00').toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

    $('#sumService').text(selectedService || '—');
    $('#sumName').text($('#firstName').val().trim() + ' ' + $('#lastName').val().trim());
    $('#sumEmail').text($('#email').val().trim() || '—');
    $('#sumDate').text(dateStr);
    $('#sumGuests').text(guests ? guests + (guests === '1' ? ' guest' : ' guests') : '—');
    $('#sumPrice').text(guests && price ? '£' + total + ' total' : '—');
    const notes = $('#notes').val().trim();
    notes ? $('#sumNotes').text(notes) && $('#sumNotesRow').show() : $('#sumNotesRow').hide();
  }

  // Submit
  $('#submitBooking').on('click', function () {
    const $b = $(this).text('Sending…').prop('disabled', true).css('opacity', '.7');
    setTimeout(function () {
      $('.booking-step').addClass('hidden');
      $('#stepSuccess').removeClass('hidden');
      $('.step').removeClass('active done');
      $('.step-line').removeClass('done');
      $b.text('Confirm Reservation').prop('disabled', false).css('opacity', '');
    }, 1200);
  });

  // Reset
  $('#resetBooking').on('click', function () {
    $('#firstName,#lastName,#email,#phone,#notes,#bookDate,#guests').val('');
    selectedService = '';
    $('.service-card').removeClass('selected');
    $('#nextToStep2').prop('disabled', true);
    goToStep(1);
  });

  // 5. Gallery hover
  $('.gallery-img').each(function () {
    const $i = $(this);
    $i.on('mouseenter', function () { $i.find('p').animate({ opacity: 1, marginTop: '0' }, 200); })
      .on('mouseleave', function () { $i.find('p').animate({ opacity: .6, marginTop: '5px' }, 200); });
  });

  // 6. Hero parallax
  $(window).on('scroll', function () {
    $('.hero-image-wrap').css('transform', 'translateY(' + $(this).scrollTop() * 0.25 + 'px)');
  });

  // 7. Feature list staggered reveal
  function revealFeatures() {
    $('.feature-list:not(.revealed)').each(function () {
      if ($(window).scrollTop() + $(window).height() > $(this).offset().top + 40) {
        $(this).addClass('revealed').find('.feature-item').each(function (i) {
          const $it = $(this).css({ opacity: 0, transform: 'translateX(-12px)' });
          setTimeout(function () { $it.css({ transition: 'opacity .4s ease, transform .4s ease', opacity: 1, transform: 'translateX(0)' }); }, i * 80);
        });
      }
    });
  }
  $(window).on('scroll', revealFeatures);
  revealFeatures();

});
