$(function () {

  let selectedService = '';
  let price = 0;

  // NAV
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 50);
  });

  // SCROLL
  $('a[href^="#"], #navBookBtn').click(function (e) {
    e.preventDefault();
    const target = $(this).attr('href') || '#booking';
    $('html, body').animate({
      scrollTop: $(target).offset().top - 60
    }, 500);
  });

  // SERVICE SELECT
  $('.service-card').click(function () {
    $('.service-card').removeClass('selected');
    $(this).addClass('selected');

    selectedService = $(this).data('value');
    price = $(this).data('price');

    $('#nextToStep2').prop('disabled', false);
  });

  // STEP NAVIGATION
  function goTo(step) {
    $('#step1, #step2, #step3').addClass('hidden');
    $('#step' + step).removeClass('hidden');
  }

  $('#nextToStep2').click(() => goTo(2));
  $('#backToStep1').click(() => goTo(1));

  $('#nextToStep3').click(function () {
    if (!$('#firstName').val() || !$('#email').val()) return;

    const guests = $('#guests').val() || 1;
    const total = price * guests;

    $('#sumService').text(selectedService);
    $('#sumPrice').text("£" + total);

    goTo(3);
  });

  // SUBMIT
  $('#submitBooking').click(function () {
    $('#step3').addClass('hidden');
    $('#success').removeClass('hidden');
  });

  // RESET
  $('#resetBooking').click(function () {
    location.reload();
  });

});