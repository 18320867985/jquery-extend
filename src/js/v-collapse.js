/*
 * hqs  v-collapse
 */

+ function () {
    'use strict';

    // define class
    var VCollapse = function (el, options) {
        this.el = el;
        this.options = options;
    };

    VCollapse.prototype.toggle = function (targetEl) {
    
        var $this = $(this.el);
        var isIn = $this.hasClass("in");
        if (isIn){
            this.hide(targetEl);
        } else {
            this.show(targetEl);
        }
    };

    VCollapse.prototype.show = function (targetEl) {
  
        var $this = $(this.el);
        // accordion
        if (this.options.parent) {
            $(".v-collapse",$this.parents(this.options.parent)).removeClass("in").stop().slideUp();
        }
        $this.addClass("in").stop().slideDown();

        // 触发自定义的事件
        $this.trigger("v-collapse-show", [$this.get(0), targetEl]);
    };

    VCollapse.prototype.hide = function (targetEl) {
     
        var $this = $(this.el);
        // accordion
        if (this.options.parent) {
            $(".v-collapse", $this.parents(this.options.parent)).removeClass("in").stop().slideUp();
        }
        $this.removeClass("in").stop().slideUp();
        // 触发自定义的事件
        $this.trigger("v-collapse-hide", [$this.get(0), targetEl]);
       
    };

    function Plugin(option, targetEl) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-collapse');
            var options = typeof option === 'object' && option;

            if (!data) {
                var o = {};
                o.parent = $this.attr("data-parent") ||"";
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

    $(".v-collapse.in").each(function () {
        Plugin.call($(this), "show");
    });

    $(document).on("click", "[data-toggle=v-collapse]", function (e) {
        e.preventDefault();
        var target = $(this).attr("data-target") || $(this).attr("href") || "";
        var targetEl = this;
        Plugin.call($(target),"toggle", targetEl);
    });

}(); 