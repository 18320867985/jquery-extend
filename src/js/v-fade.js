/*
 hqs v-fade
 *
 **/


//+function(){
	
//	$.fn.extend({

//    VFade2: function () {

//        for (var i = 0; i < this.length; i++) {
//            checkObj(this[i]);
//        }
//        function checkObj(obj) {

//            obj.index = 0;
//            obj.length = $(".v-fade-wrap ._cont li", $(obj)).length;
//            obj.clearAutoId = 0;
//            obj.time = Number($(obj).attr("data-time"));
//            setImgBackground(obj);
//            auto(obj.time);

//            function auto(time) {

//                obj.clearAutoId = setInterval(function () {
//                    obj.index = (obj.index + 1) % (obj.length);
//                    fadeImg(obj, obj.index);
//                }, time);

//            }

//            $(obj).mouseenter(function () {
               
//                $(".v-fade-btn", $(obj)).stop().fadeIn();
//                clearInterval(obj.clearAutoId);
//            });

//            $(obj).mouseleave(function () {
//                $(".v-fade-btn", $(obj)).stop().fadeOut();
//                auto(obj.time);
//            });

//            $(".v-fade-btn-l", $(obj)).on("click", function () {

//                if (obj.index <= 0) {
//                    obj.index = obj.length - 1;
//                } else {
//                    obj.index = obj.index - 1;
//                }
//                fadeImg(obj, obj.index);

//            });

//            $(".v-fade-btn-r", $(obj)).on("click", function () {

//                obj.index = (obj.index + 1) % (obj.length);
//                fadeImg(obj, obj.index);

//            });

//            $("._radius-list span", $(obj)).mouseenter(function () {
//                obj.index = Number($(this).index());
//                fadeImg(obj, obj.index);
//            });

//            function setImgBackground(el) {
//                var els = $(".v-fade-wrap ._cont li", $(el));
//                els.each(function () {
//                    if ($(this).hasClass("init")) {
//                        var color = $(this).attr("data-bg") || "#fff";
//                        var vfade = $(this).closest(".v-fade");
//                        vfade.css("background", color);
//                        $(this).siblings().css("opacity", 0);
//                        //v-fade.css("-webkit-transition", ".2s");
//                        //v-fade.css("-o-transition", ".2s");
//                        //v-fade.css("-zom-transition", ".2s");
//                        //v-fade.css("-ms-transition", ".2s");
//                        //v-fade.css("transition", ".2s");

//                        return false;
//                    }
//                });

//            }

//            function fadeImg(el, index) {
//                var vfade = $(el).closest($(obj));
//                var lis = $(".v-fade-wrap ul li", vfade);

//                var color = lis.eq(index).attr("data-bg") || "#fff";
//                vfade.css("background", color);

//                lis.eq(index).siblings().stop().animate({
//                    "opacity": 0
//                }, 1000).hide();
//                lis.eq(index).siblings().removeClass("active init");

//                lis.eq(index).stop().show(0).animate({
//                    "opacity": 1
//                }, 1000);
//                lis.eq(index).addClass("active");
//                setRadius(index);

//                // 触发自定义事件
//                lis.eq(index).trigger("v-fade-show", [lis.get(index),index]);

//            }

//            function setRadius(index) {
//                $("._radius-list span", obj).removeClass("active");
//                $("._radius-list span", obj).eq(index).addClass("active");
//            }
//        }
//    }

//	});

//}();

+function () {

    'use strict';

    // define class
    var VFade = function (el, options) {
        this.options = options;
        this.el = el;
        this.runing();
    };

    VFade.DEFAULTS = {
        time: 3000,
        isTopbottom: false

    };

    VFade.prototype.autoPlay = function () {
        var obj = this.el;
        var $this = this;

        obj.clearAutoId = setInterval(function () {
            obj.index = (obj.index + 1) % (obj.length);
            this.fadeImg(obj, obj.index);
        }, $this.options.time);

    };

    VFade.prototype.fadeImg = function (el, index) {

        var obj = this.el;
        var vfade = $(el).closest($(obj));
        var lis = $(".v-fade-wrap ul li", vfade);

        var color = lis.eq(index).attr("data-bg") || "#fff";
        vfade.css("background", color);

        lis.eq(index).siblings().stop().animate({
            "opacity": 0
        }, 1000).hide();
        lis.eq(index).siblings().removeClass("active init");

        lis.eq(index).stop().show(0).animate({
            "opacity": 1
        }, 1000);
        lis.eq(index).addClass("active");
        this.setRadius(index);

        // 触发自定义事件
        lis.eq(index).trigger("v-fade-show", [lis.get(index), index]);

    };

    VFade.prototype.setRadius = function (index) {
        $(".radius-list span", this.el).removeClass("active");
        $(".radius-list span", this.el).eq(index).addClass("active");
       
    };

    VFade.prototype.runing = function () {
        var $this = this;
        var obj = this.el;
        obj.index = 0;
        obj.length = $(".v-fade-wrap ._cont li", $(obj)).length;
        obj.clearAutoId = 0;
        obj.time = Number($(obj).attr("data-time"));
        this.setImgBackground(obj);
        this.autoPlay();

    };

    VFade.prototype.setImgBackground = function () {
        var els = $(".v-fade-wrap ._cont li", $(this.el));
        console.log(els)
        els.each(function () {

                    if ($(this).hasclass("init")) {
                        var color = $(this).attr("data-bg") || "#fff";
                        var vfade = $(this).closest(".v-fade");
                        vfade.css("background", color);
                        $(this).siblings().css("opacity", 0);
                        //v-fade.css("-webkit-transition", ".2s");
                        //v-fade.css("-o-transition", ".2s");
                        //v-fade.css("-zom-transition", ".2s");
                        //v-fade.css("-ms-transition", ".2s");
                        //v-fade.css("transition", ".2s");

                        return false;
                    }

                });
    };

    function Plugin(option) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-fade');
            var options = typeof option === 'object' && option;

            if (!data) {
                var o = {};
                o.time = parseInt($this.attr("data-time")) || VFade.DEFAULTS.time;
                var p = $.extend({}, o, options);
                $this.data('v-fade', data = new VFade(this, p));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vslide = $.fn.vslide;
    $.fn.vslide = Plugin;

    $(function () {

        $(".v-fade.v-fade-runing").each(function (e) {
            var $this = $(this);
            Plugin.call($this);

        });

    });


}();