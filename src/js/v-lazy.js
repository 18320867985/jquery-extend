
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
           
        };

        VLazy.prototype.show = function (url) {
			
			var $this =$(this.el);
			var src=$this.attr("data-lazy")||"";
            src = typeof url === "string" ? url : src;
            if (src) {
                $this.attr("src", src);
               
            }
			
        };
		
		
		VLazy.prototype.runing = function () {
			
			var $this =$(this.el);
			var src=$this.attr("src")||"";
            this.oldsrc = src;
            $this.on("load.v-lazy", function (e) {
                $this.css("opacity",0).stop().animate({
                opacity:1},500);
            });
            
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

            // html 元素遍历
			$(window).on("load",function(){	 
                $("[data-toggle=v-lazy]").each(function () {
                    var $this = $(this);
                    var src = $this.attr("data-lazy") || "";
                    if (src) { Plugin.call($this, "show"); }

				});
			});
            
    
}();

