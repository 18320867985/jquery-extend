
/**
 * jq extend

**/

+function () {

    // html 属性模式
    /*
         <div data-spy="affix" data-offset-top="60" data-offset-bottom="200">
          ...
        </div>
    */

        var VAffix = function (options) {

            this.el = options.el;
            this.top = options.top;
            this.bottom = options.bottom;
            this.positionTop = options.positionTop;
            this.offsetTop = options.offsetTop;
            this.offsetBottom = options.offsetBottom;

            this.runing();
        };

        VAffix.DEFAULTS = {
            offsetTop: 0,
            offsetBottom: 0
        };

        VAffix.prototype.runing = function () {

            var o = this;
            $(window).on("scroll", function (
            ) {
                var $this = o.el;
                var win_srl_top = $(window).scrollTop();
                var _top = o.top - o.offsetTop;

                if (win_srl_top >_top) {
                    $this.addClass("v-affix");

                    //o.offsetBottom 值大于0 执行
                    if (o.offsetBottom) {
                        $this.css("bottom", o.offsetBottom + "px");
                    } else {
                        $this.css("top", o.offsetTop + "px");
                    }
                   
                } else {
                    $this.removeClass("v-affix").css({
                        "top": "auto",
                        "bottom": "auto"
                    });
                }

            });
       
        };

        function Plugin(option) {
           
          return  this.each(function () {
              
                var $this = $(this);
                var data = $this.data('v-affix');
                var options = typeof option === 'object' && option;

                if (!data) {

                    var o = {};
                    o.el = $this;
                    o.positionTop =parseFloat($this.css("top"))||0;
                    o.top =parseFloat($this.offset().top);
                    var p = $.extend({}, VAffix.DEFAULTS, o, options);
                    console.log(p);
                    $this.data('v-affix', data = new VAffix(p));

                }
                if (typeof option === 'string') {

                    data[option]();
                }
            
            });
        }
            var _vaffix=$.fn.vaffix;
            $.fn.vaffix =Plugin;

            // html 元素遍历
            $("[data-spy='v-affix']").each(function () {
           
                var $this = $(this);
                Plugin.call($this);
         
            });
 
      
}();

