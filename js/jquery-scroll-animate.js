;(function ($) {
  'use strict'

  $.scrollAnimate = function (options) {

    // default setting
    var self = $.extend({
      space: 200,
      speed: 1000,
      ease: 'easeOutCirc',
      target: $('body'),
    }, options || {});

    // private fields & init
    var container = $(window),
        top = 0,
        viewHight = $(window).height(),
        scrolling = false;

    // for different browser
    var target = $('html, body, document');

    // mouse wheel events
    self.target.mousewheel(function (event, delta) {

      scrolling = true;

      if (delta < 0)
        top = (top + viewHight) >= self.target.outerHeight() ? top : top += self.space;
      else
        top = top <= 0 ? 0 : top -= self.space;

      target.stop().animate({
        scrollTop: top
      }, self.speed, self.ease, function(){
        scrolling = false;
      });

      // prevent processing doing again
      return false;
    });

    container
      .on('resize', function (e) {
        viewHight = container.height();
      })
      .on('scroll', function (e) {
        if (!scrolling)
          top = container.scrollTop();
      })

  }



  var _object = null;
  $(window).resize(function() {
    var _size;
    if (!screen.deviceXDPI && !screen.logicalXDPI) {
      _size = window.devicePixelRatio;
    } else {
      _size = screen.deviceXDPI / screen.logicalXDPI;
    }
    if (_object !== null) {
      _object.each(function() {
        $(this).css({
          "zoom": 1 / _size,
          "-moz-transform": "scale(" + 1 / _size + ")"
        });
      });
    }
  }).resize();
  $.fn.fixedZoom = function() {
    if (_object === null ) {
      _object = this;
    } else {
      _object.add(this)
    }
    return this;
  };
})(jQuery);
