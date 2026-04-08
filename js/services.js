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