/*
 * v-modal 
 */

//+function () {


//    function addHtmlPadding() {
//        var win_h = $(window).outerHeight();
//        var doc_h = $(document).outerHeight();
//        if (doc_h > win_h) {
//            $("html").addClass("html-v-modal");
//        }
//    }
//      v-modal
//    $(".v-modal").each(function () {

//        var $this = $(this);
//        var bl = $this.hasClass("in");
//        if (bl) {
//            addHtmlPadding();
          
//             触发自定义的事件
//            $this.trigger("v-modal", [bl, $this.get(0), $this.get(0)]);

//            var isBack = $this.attr("data-backdrop") || "true";

//            if ("true" === $.trim(isBack)) {

//                $(document).on("click", ".v-modal-cnt", function (e) {
//                    e.stopPropagation();
//                });

//                $(document).one("click", ".v-modal", function (e) {
//                    $this.removeClass("in").addClass("out");
//                    $("html").removeClass("html-v-modal");
//                     触发自定义的事件
//                    $this.trigger("v-modal", [false, $this.get(0), $this.get(0)]);

//                });
//            }
//        }

//    });


//     data-toggle=v-modal
//    $(document).on("click", "[data-toggle=v-modal]", function (e) {

//        e.preventDefault();
//        var target = $(this).attr("data-target") || $(this).attr("href")||"";

//        var bl = false;
//        if ($(target).length > 0) {

//            $(target).removeClass("out");
//            $(target).eq(0).addClass("in");
//            addHtmlPadding();
//            bl = $(target).eq(0).hasClass("in");
//            var p = $(target).closest(".v-modal");

//             触发自定义的事件
//            $(target).trigger("v-modal", [bl, $(target).get(0), this]);
//            var isBack = $(target).attr("data-backdrop") || "true";
//            if ("true" === $.trim(isBack)) {
//                $(document).on("click", ".v-modal-cnt", function (e) {
//                    e.stopPropagation();
//                });

//                $(document).one("click", ".v-modal", function (e) {
//                    $(p).removeClass("in").addClass("out");
//                    $("html").removeClass("html-v-modal");
//                     触发自定义的事件
//                    $(target).trigger("v-modal", [false, $(target).get(0), this]);

//                });
//            }

//        }


//    });

//     [data-dismiss=v-modal]
//    $(document).on("click", "[data-dismiss=v-modal]", function (e) {

//        $(document).off("click", ".v-modal");
//        e.preventDefault();
//        $(this).parents(".v-modal").removeClass("in").addClass("out");
//        $("html").removeClass("html-v-modal");
//         触发自定义的事件
//        $(this).trigger("v-modal", [false, $(this).parents(".v-modal").get(0), this]);

//    });


//    $.fn.extend({
//         bl='hide'=关闭 bl='show'=显示, targetEl=目标元素
//        VModal: function (bl, targetEl) {

//            var $this = $(this);
//            if (bl === "show") {
//                $this.addClass("in").removeClass("out");
//                addHtmlPadding();
//                var isBack = $this.attr("data-backdrop") || "true";

//                if ("true" === $.trim(isBack)) {

//                    $(document).on("click", ".v-modal-cnt", function (e) {
//                        e.stopPropagation();
//                    });

//                    $(document).one("click", ".v-modal", function (e) {
//                        $(".v-modal").removeClass("in").addClass("out");
//                        $("html").removeClass("html-v-modal");
//                         触发自定义的事件
//                        $this.trigger("v-modal", [false, $this.get(0), targetEl]);
//                    });
//                }
//                 触发自定义的事件
//                $this.trigger("v-modal", [true, $(this).get(0), targetEl]);

//            } else if (bl === "hide") {
//                $this.removeClass("in").addClass("out");
//                $("html").removeClass("html-v-modal");

//                 触发自定义的事件
//                $this.trigger("v-modal", [false, $(this).get(0), targetEl]);
//            }

//        }
//    });



//}();



+ function () {
    'use strict';

    // define class
    var VModal = function (el, options) {
        this.el = el;
        this.options = options;
        console.log(options);
        this.runing();
        this.dissmis();

    };

    VModal.prototype.runing = function () {

        $(document).on("click.v-modal", this.el, $.proxy(this.elementEvent,this));

    };

    VModal.prototype.elementEvent = function () {
        
  
        var target = this.options.target;
        var $target = $(target);
        if ($target.length > 0) {
              this.show();
        }
    };

    VModal.prototype.show = function () {

        var self = this;
        var $this = $(this.el);
        var $target = $(this.options.target);
        $target.removeClass("out").addClass("in");
        this.addHtmlPadding();
        var isBack = this.options.backdrop;

            if (isBack) {

                $(document).on("click.v-modal", ".v-modal-cnt", function (e) {
                    e.stopPropagation();
                });

                $(document).one("click.v-modal", $this, $.proxy(this.hide,this));
             }

            // 触发自定义的事件
        $this.trigger("v-modal", [true, $this.get(0), $(self.options.target).get(0)]);

    };

    VModal.prototype.hide = function () {
        
        var $target = $(this.options.target);
        $target.removeClass("in").addClass("out");
        $("html").removeClass("html-v-modal");

         // 触发自定义的事件
        $target.trigger("v-modal", [false, this.el, $target.get(0)]);
        
    };

    VModal.prototype.addHtmlPadding = function () {

        var win_h = $(window).outerHeight();
        var doc_h = $(document).outerHeight();
        if (doc_h > win_h) {
            $("html").addClass("html-v-modal");
        }
    };

    VModal.prototype.dissmis = function () {

        $(document).on("click.v-model", "[data-dismiss=v-modal]", function (e) {

            $(document).off("click.v-model", ".v-modal");
            e.preventDefault();
            alert();
            console.log($(this))
            $(this).parents(".v-modal").removeClass("in").addClass("out");
            $("html").removeClass("html-v-modal");
            // 触发自定义的事件
            $(this).trigger("v-modal", [false, $(this).parents(".v-modal").get(0), this]);

        });

    };


    function Plugin(option) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-model');
            var options = typeof option === 'object' && option;

            if (!data) {
                var o = {};
                o.target = $this.attr("data-target") || $this.attr("href") || "";
                o.backdrop = Boolean($this.attr("data-backdrop")) || true;
                var p = $.extend({},o, options);
                $this.data('v-model', data = new VModal(this, p));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vmodal = $.fn.vmodal;
    $.fn.vmodal = Plugin;


   

}();