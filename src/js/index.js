$(document).ready(function(){

  $('.carousel__inner').slick({
    speed: 900,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-left.svg"></img></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-right.svg"></img></button>',
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    })
  }
  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  // Modal
  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  })

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    })
  })

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  })

  function valideForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
        },
        phone: {
          required: true,
          minlength: 13
        },
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя"
        },
        phone: {
          required: "Пожалуйста, введите свой номер телефон",
          minlength: jQuery.validator.format("Номер телеону має складатись з {0} символів")
        },
        email: {
          required: "Пожалуйстка, введите ваш email",
          email: "Email должен быть в формате: name@domain.com"
        }
      }
    })
  }
  valideForms('#consultation-form');
  valideForms('#consultation form');
  valideForms('#order form');

  $('input[name=phone]').mask("+380 (99) 999 99 99");

  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
    }).done(function() {
        $(this).find("input").val("");
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');

        $('form').trigger('reset');
    });
    return false;
  });

  // Smooth scroll and pageup
  $(window).scroll(function() {
    if ($(this).scrollTop() > 1000) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }

    // $("a[href^='#'").click(function() {
    //   const _href = $(this).attr("href");
    //   $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    //   return false;
    // })

    $("#up").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        let hash = this.hash;
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, {
            duration: 50,
            easing: "linear", // Змінити easing на "linear" або "swing"
            complete: function(){
                window.location.hash = hash;
            }
        });
      } 
    });
  })

  new WOW().init();
});