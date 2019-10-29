/*
 * v-modal 
 */


+ function () {
    'use strict';

    // define class
    var VModal = function (el, options) {
        this.el = el;
        this.options = options;
        this.dissmis();

    };

   
    VModal.prototype.elementEvent = function () {
       
        var target = this.options.target;
        var $target = $(target);
        if ($target.length > 0) {
            $.proxy(this.show(),this);
        }
    };

    VModal.prototype.show = function (targetEl) {
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

                $(document).one("click.v-modal", ".v-modal", $.proxy(this.hide,this));
             }

        // 触发自定义的事件
        $this.find(".v-modal-cnt").trigger("v-modal-show", [$this.get(0), targetEl]);

    };

    VModal.prototype.hide = function (targetEl) {
        var $target = $(this.el);
        $target.removeClass("in").addClass("out");
        $("html").removeClass("html-v-modal");

         // 触发自定义的事件
        $target.trigger("v-modal-hide", [this.el,targetEl]);
        
    };

    VModal.prototype.addHtmlPadding = function () {

        var win_h = $(window).outerHeight();
        var doc_h = $(document).outerHeight();
        if (doc_h > win_h) {
            $("html").addClass("html-v-modal");
        }
    };

    VModal.prototype.dissmis = function () {
        var self = this;
        $(document).on("click.v-model", "[data-dismiss=v-modal]", function (e) {
          
            $(document).off("click.v-modal",".v-modal");
            e.preventDefault();
            $(this).parents(".v-modal").removeClass("in").addClass("out");
            $("html").removeClass("html-v-modal");
            // 触发自定义的事件
            $(this).trigger("v-modal-hide", [$(this).parents(".v-modal").get(0), this]);

        });

    };


    function Plugin(option,targetEl) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-modal');
            var options = typeof option === 'object' && option;

            if (!data) {
                var o = {};
                o.backdrop = ($this.attr("data-backdrop") || "true") === "true";
                var p = $.extend({},o, options);
                $this.data('v-modal', data = new VModal(this, p));
            }

            if (typeof option === 'string') {
                data[option](targetEl);
            }

        });
    }

    var _vmodal = $.fn.vmodal;
    $.fn.vmodal = Plugin;

    $(document).on("click", "[data-toggle=v-modal]", function (e) {
       var target= $(this).attr("data-target") || $this.attr("href") || "";
        var targetEl = this;
        Plugin.call($(target), "show", targetEl);
    });
   

}();