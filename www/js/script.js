/* global jQuery */
(function($) {
  /* global window document ga navigator requestAnimationFrame */
  var $window = $(window);
  var $body = $('body');

  if (window.ga) {
    var player = $('#video-player');
    var playerOrigin = '*';

    $('a').click(function() {
      ga('send', 'event', 'Nav', 'click', this.href);
    });

    // Listen for messages from the player
    if (window.addEventListener) {
      window.addEventListener('message', handleVideoMessage, false);
    } else {
      window.attachEvent('onmessage', handleVideoMessage, false);
    }

    $('.discount-ends').each(function() {
      const $el = $(this);
      const deadline = new Date($el.data('deadline')).getTime();
      if (Date.now() > deadline) return;
      setInterval(function() {
        const now = Date.now();
        if (now > deadline) return;
        const [date, time] = new Date(deadline - now).toJSON().split('T');
        const days = date.split('-').pop();
        const [h, m, s] = time.split(':');

        $el.html(
          `ends in <span style="color: red">${parseInt(days, 10)}d ${parseInt(
            h,
            10
          )}h ${m}m ${s.split('.')[0]}s</span>`
        );
      }, 1000);
    });

    // Handle messages received from the player
    var handleVideoMessage = function(event) {
      // Handle messages from the vimeo player only
      if (!/^https?:\/\/player.vimeo.com/.test(event.origin)) {
        return false;
      }

      if (playerOrigin === '*') {
        playerOrigin = event.origin;
      }

      var data = JSON.parse(event.data);

      switch (data.event) {
        case 'ready':
          onReady();
          break;

        case 'play':
          trackEvent('play');
          break;

        case 'pause':
          trackEvent('pause');
          break;

        case 'finish':
          trackEvent('finish');
          break;
      }
    };

    // Helper function for sending a message to the player
    function post(action, value) {
      var data = {
        method: action,
      };
      if (value) {
        data.value = value;
      }
      var message = JSON.stringify(data);
      player[0].contentWindow.postMessage(message, playerOrigin);
    }

    function onReady() {
      post('addEventListener', 'play');
      post('addEventListener', 'pause');
      post('addEventListener', 'finish');
    }

    function trackEvent(event) {
      ga('send', 'event', 'All', 'video-' + event, 'introduction');
    }
  }

  $.ajax({
    dataType: 'json',
    url: 'https://taxtools.io/api/eu',
    success: function(res) {
      if (res) {
        $body.addClass('eu');
      }
    },
  });

  /** below be the 🐲 aka JavaScript that came with the theme 😿 */

  $(document).on('ready', function() {
    var drew = {
      headerFloatingHeight: 60,
    };

    /**
     * =======================================
     * Function: Detect Mobile Device
     * =======================================
     */
    // source: http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
    var isMobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (
          isMobile.Android() ||
          isMobile.BlackBerry() ||
          isMobile.iOS() ||
          isMobile.Opera() ||
          isMobile.Windows()
        );
      },
    };

    /**
     * =======================================
     * Function: Resize Background
     * =======================================
     */
    var resizeBackground = function() {
      $(
        '.section-background-video > video, .section-background-image > img, .two-cols-description-image > img'
      ).each(function(i, el) {
        var $el = $(el),
          $section = $el.parent(),
          minWidth = 300,
          elWidth = el.tagName === 'VIDEO' ? el.videoWidth : el.naturalWidth,
          elHeight = el.tagName === 'VIDEO' ? el.videoHeight : el.naturalHeight,
          sectionWidth = $section.outerWidth(),
          sectionHeight = $section.outerHeight(),
          scaleWidth = sectionWidth / elWidth,
          scaleHeight = sectionHeight / elHeight,
          scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight,
          newElWidth,
          newElHeight,
          offetTop,
          offetLeft;

        if (scale * elWidth < minWidth) {
          scale = minWidth / elWidth;
        }

        newElWidth = scale * elWidth;
        newElHeight = scale * elHeight;
        offetLeft = (newElWidth - sectionWidth) / 2 * -1;
        offetTop = (newElHeight - sectionHeight) / 2 * -1;

        $el.css('width', newElWidth);
        $el.css('height', newElHeight);
        $el.css('marginTop', offetTop);
        $el.css('marginLeft', offetLeft);
      });
    };
    $body.on('pageStart', function() {
      resizeBackground();
    });

    /**
     * =======================================
     * IE9 Placeholder
     * =======================================
     */
    $('form').on('submit', function() {
      $(this)
        .find('[placeholder]')
        .each(function() {
          var $input = $(this);
          if ($input.val() === $input.attr('placeholder')) {
            $input.val('');
          }
        });
    });

    $('[placeholder]')
      .on('focus', function() {
        var $input = $(this);
        if ($input.val() === $input.attr('placeholder')) {
          $input.val('');
          $input.removeClass('placeholder');
        }
      })
      .on('blur', function() {
        var $input = $(this);
        if (
          $input.val() === '' ||
          $input.val() === $input.attr('placeholder')
        ) {
          $input.addClass('placeholder');
          $input.val($input.attr('placeholder'));
        }
      })
      .blur();

    /**
     * =======================================
     * Detect Mobile Device
     * =======================================
     */
    if (isMobile.any()) {
      // add identifier class to <body>
      $body.addClass('mobile-device');
      // remove all element with class "remove-on-mobile-device"
      $('.remove-on-mobile-device').remove();
    }

    /* =======================================
     * Resize Video Background
     * =======================================
     */
    $window.on('resize', function() {
      requestAnimationFrame(resizeBackground);
    });

    /* =======================================
     * Slideshow Background
     * =======================================
     */
    if ($.fn.responsiveSlides) {
      $body.on('pageStart', function() {
        $('.section-background-slideshow').responsiveSlides({
          speed: $(this).data('speed') ? $(this).data('speed') : 800,
          timeout: $(this).data('timeout') ? $(this).data('timeout') : 4000,
        });
      });
    }

    /* =======================================
     * Testimonial Slider
     * =======================================
     */
    if ($.fn.responsiveSlides) {
      $body.on('pageStart', function() {
        $('.testimonial-slider').responsiveSlides({
          speed: $(this).data('speed') ? $(this).data('speed') : 800,
          timeout: $(this).data('timeout') ? $(this).data('timeout') : 4000,
          auto: $(this).data('auto') ? $(this).data('auto') : false,
          pager: true,
        });
      });
    }

    /* =======================================
     * Hero Slider
     * =======================================
     */
    if ($.fn.responsiveSlides) {
      $body.on('pageStart', function() {
        $('.section-slider').responsiveSlides({
          speed: $(this).data('speed') ? $(this).data('speed') : 800,
          timeout: $(this).data('timeout') ? $(this).data('timeout') : 4000,
          auto: $(this).data('auto') ? $(this).data('auto') : false,
          nav: true,
        });
      });
    }

    /* =======================================
     * Video Embed Async Load
     * =======================================
     */
    $body.on('pageStart', function() {
      $('.video-async').each(function(i, el) {
        var $el = $(el),
          source = $el.data('source'),
          video = $el.data('video'),
          color = $el.data('color');

        if (source === 'vimeo') {
          $el.attr(
            'src',
            '//player.vimeo.com/video/' +
              video +
              (color ? '?color=' + color : '')
          );
        } else if (source === 'youtube') {
          $el.attr('src', '//www.youtube.com/embed/' + video + '?rel=0');
        }
      });
    });

    /**
     * =======================================
     * Scroll Spy
     * =======================================
     */
    var toggleHeaderFloating = function() {
      // Floating Header
      if ($window.scrollTop() > 80) {
        $('.header-section').addClass('floating');
      } else {
        $('.header-section').removeClass('floating');
      }
    };

    $window.on('scroll', toggleHeaderFloating);

    /**
     * =======================================
     * One Page Navigation
     * =======================================
     */
    if ($.fn.onePageNav) {
      $('#header-nav').onePageNav({
        scrollSpeed: 1000,
        filter: ':not(.external)',
        begin: function() {
          $('#navigation').collapse('toggle');
        },
      });
    }

    /**
     * =======================================
     * Anchor Link
     * =======================================
     */
    $body.on('click', 'a.anchor-link', function(e) {
      e.preventDefault();

      var $a = $(this),
        $target = $($a.attr('href'));

      if ($target.length < 1) {
        return;
      }

      $('html, body').animate(
        {
          scrollTop: Math.max(
            0,
            $target.offset().top - drew.headerFloatingHeight
          ),
        },
        1000
      );
    });

    $body.trigger('pageStart');
    $window.trigger('resize');
    $window.trigger('scroll');
  });
})(jQuery);
