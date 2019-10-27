
/**
 * hqs  lazy.js

**/

+function () {

        var VLazy = function (el,options) {
			
			this.el=el;
			this.oldsrc="";
            this.options = options;
			this.runing();  
			
        };

        VLazy.DEFAULTS = {
            timing: 400
        };

        VLazy.prototype.show = function (url) {
			
			var $this =$(this.el);
			var src=$this.attr("data-lazy")||"";
            src = typeof url === "string" ? url : src;
            if (src) {
                $this.attr("src", src);
            }
			
    };

         VLazy.prototype.reset = function (url) {

        var src = this.oldsrc || "";
        if (this.oldsrc) {
           $(this.el).attr("src", src);
        }

    };

    VLazy.prototype.scroll = function () {

            if (this.el === window) {
           
                $(window).on("scroll.v-lazy", this._scrollImg);

            } 

    };

    VLazy.prototype._scrollImg = function () {

                var $list = $(document).find(".v-lazy-img");
                var window_h = $(window).height();
                var len = $list.length;
                if (len === 0) { return;}
                $list.each(function () {
                    var $this = $(this);
                    var img_h = parseInt($this.offset().top) - parseInt(window_h);
                    var img_h2 = parseInt($this.offset().top) + $this.outerHeight();
                    var _srltop = $(window).scrollTop();
                    if (_srltop >= img_h && _srltop < img_h2) {

                        if (!$this.data("bl")) {
                            $this.data("bl", true);
                            var _src = $this.attr("data-lazy") || "";
                            $this.attr("src", _src);
                            $this.removeClass("v-lazy-img");
                            $this.on("load.v-lazy", function () {
                                $this.css("opacity", 0).stop().animate({
                                    opacity: 1
                                }, VLazy.DEFAULTS.timing);
                            });
                        }
                    }

                });

    };

		
		VLazy.prototype.runing = function () {

            if (this.el.nodeName === "IMG") {
                var $this = $(this.el);
                var src = $this.attr("src") || "";
                this.oldsrc = src;
                $this.on("load.v-lazy", function (e) {
                    $this.css("opacity", 0).stop().animate({
                        opacity: 1
                    }, VLazy.DEFAULTS.timing);
                });
            }
		};

        function Plugin(option,url) {
           
          return  this.each(function () {
              
                var $this = $(this);
                var data = $this.data('v-lazy');
                var options = typeof option === 'object' && option;

                if (!data) {

                    var p = $.extend({}, VLazy.DEFAULTS,options);
                   
                    $this.data('v-lazy', data = new VLazy(this,p));

                }
                if (typeof option === 'string') {

                    data[option](url);
                }
            
            });
         }

        var _vlazy=$.fn.vlazy;
        $.fn.vlazy =Plugin;

		$(window).on("load.v-lazy",function(){	 
            $("[data-toggle=v-lazy]").each(function () {
                var $this = $(this);
                var src = $this.attr("data-lazy") || "";
                if (src) { Plugin.call($this, "show"); }

			});
		});
            
}();

