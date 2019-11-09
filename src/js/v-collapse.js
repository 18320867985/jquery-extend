/*
 * hqs  v-modal 
 */


+ function () {
    'use strict';

    // define class
    var VCollapse = function (el, options) {
        this.el = el;
        this.options = options;
      

    };


    VCollapse.prototype.elementEvent = function () {

        var target = this.options.target;
        var $target = $(target);
        if ($target.length > 0) {
            $.proxy(this.show(), this);
        }
    };

    VCollapse.prototype.show = function (targetEl) {
        this.targetEl = targetEl;
        var $this = $(this.el);
        $this.removeClass("out");
        $this.eq(0).removeClass("out").addClass("in");
        this.addHtmlPadding();
        var isBack = this.options.backdrop;

        if (isBack) {

            $(document).on("click.v-modal", ".v-modal-cnt", function (e) {
                e.stopPropagation();
            });

            $(document).one("click.v-modal", ".v-modal", $.proxy(this.hide, this));
        }

        // 触发自定义的事件
        $this.find(".v-modal-cnt").trigger("v-modal-show", [$this.get(0), targetEl]);

    };

    VCollapse.prototype.hide = function (targetEl) {
        var $target = $(this.el);
        $target.removeClass("in").addClass("out");
        $("html").removeClass("html-v-modal");

        // 触发自定义的事件
        $target.trigger("v-modal-hide", [this.el, targetEl]);

    };


    function Plugin(option, targetEl) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-collapse');
            var options = typeof option === 'object' && option;

            if (!data) {
                var o = {};
             
                var p = $.extend({}, o, options);
                $this.data('v-collapse', data = new VCollapse(this, p));
            }

            if (typeof option === 'string') {
                data[option](targetEl);
            }

        });
    }

    var _vcollapse = $.fn.vcollapse;
    $.fn.vcollapse = Plugin;

    $(document).on("click.v-modal", "[data-toggle=v-modal]", function (e) {
        var target = $(this).attr("data-target") || $this.attr("href") || "";
        var targetEl = this;
        Plugin.call($(target), "show", targetEl);
    });


}();