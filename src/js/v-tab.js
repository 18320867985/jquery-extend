


+function () {

    $(document).on("click", "[data-toggle=v-tab]", function (e) {
        e.preventDefault();

        // btns
        var $p = $(this).closest(".v-tab");
        $(".v-tab-btn", $p).removeClass("active");
        $(this).addClass("active");
        var target = $(this).attr("data-target") || "";

        //  content
        $(".v-tab-cnt-item", $p).removeClass("active");
        $(target, $p).addClass("active");

        // 自定义事件
        $(this).trigger("v-tab", [this, $(target, $p).get(0)]);

    });

}();


/*
 * hqs  v-tab
 *
 * */


+ function () {
    'use strict';

    // define class
    var VTab = function (el, options) {
        this.el = el;
        this.options = options;
      
    };

    VTab.DEFAULTS = {
     
    };

    VTab.prototype.show = function () {

        var $this = $(this.el);
            // btns
        var $p = $this.closest(".v-tab");
            $(".v-tab-btn", $p).removeClass("active");
        $this.addClass("active");
        var target = $this.attr("data-target") || $this.attr("href")||"";

            //  content
            $(".v-tab-cnt-item", $p).removeClass("active");
            $(target, $p).addClass("active");

            // 自定义事件
            $this.trigger("v-tab", [this.el, $(target, $p).get(0)]);

  
    };

    function Plugin(option) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-tab');
            var options = typeof option === 'object' && option;

            if (!data) {
                var p = $.extend({}, VTab.DEFAULTS,options);
                $this.data('v-tab', data = new VTab(this,p));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vtab = $.fn.vtab;
    $.fn.vtab = Plugin;


    var clickHandler = function (event) {
        event.preventDefault();
        Plugin.call($(this));
    };
    // html model each
    $(document).on("click.v-tab", "[data-toggle=v-tab]", function () { 


    });


}();