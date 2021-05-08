/* v-draggale */

+function () {
    'use strict';

    // define class
    var VDraggale = function (el, options) {
        this.el = el;
        this.options = options;
		this.running();
      
    };
	
	VDraggale.DEFAULTS = {
       
    };
   
    VDraggale.prototype.running = function () {

        var option = this.options;
        option.handle = option.handle || this;
        var $box = this.el;

        $(option.handle).on("mousedown", function (event) {
            event.preventDefault();
            event.stopPropagation();
            var $this = this;
            $this.bl = false;

            if (!$this.bl) {
                this.bl = true;
                var _offset_top = parseInt($($box).offset().top);
                var _offset_left = parseInt($($box).offset().left);
                var _w = parseInt($($box).outerWidth());
                var _h = parseInt($($box).outerHeight());
                var _window_w = parseInt($(window).width());
                var _window_h = parseInt($(window).height());
                var _space_left = event.clientX - _offset_left;
                var _space_top = event.clientY - _offset_top;
                $($this).css("cursor", "move");

                $(document).on("mousemove", function (event2) {

                    var _left = event2.clientX - _space_left;
                    var _top = event2.clientY - _space_top;

                    // 左边
                    _left = _left <= 0 ? 0 : _left;
                    _left = _left >= _window_w - _w ? _window_w - _w : _left;

                    // 上边
                    _top = _top <= 0 ? 0 : _top;
                    _top = _top >= _window_h - _h ? _window_h - _h : _top;
                    $($box).css({
                        left: _left,
                        top: _top,
                        margin: 0
                    })

                });

                $(document).on("mouseup", function (event) {
                    $(document).off("mousemove");
                    $(document).off("mouseup");
                    $this.bl = false;
                    $($this).css("cursor", "default");

                });

            };

        });
		
		$(window).resize(function() {
			
						var _offset_top = parseInt($($box).offset().top);
						var _offset_left = parseInt($($box).offset().left);
						var _w = parseInt($($box).outerWidth());
						var _h = parseInt($($box).outerHeight());
						var _window_w = parseInt($(window).width());
						var _window_h = parseInt($(window).height());
						var _left =(_offset_left+_w)>=_window_w?_window_w-_w:_offset_left;
						var _top = (_offset_top+_h)>=_window_h?_window_h-_h:_offset_top;
						if(_offset_left<=0){
							_left=0;
						}
						if(_offset_top<=0){
							_top=0;
						}
						$($box).css({
							left: _left,
							top: _top,
							margin: 0
						})
		
					});
    }

    function Plugin(option) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-draggale');
            var options = typeof option === 'object' && option;

            if (!data) {
                var p = $.extend({},options);
                $this.data('v-draggale', data = new VDraggale(this,p));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }


    var _vdraggale = $.fn.vdraggale;
    $.fn.vdraggale = Plugin;


 
}();