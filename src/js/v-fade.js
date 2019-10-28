/*
 hqs v-fade
 *
 **/


+function(){
	
	$.fn.extend({

    VFade: function () {

        for (var i = 0; i < this.length; i++) {
            checkObj(this[i]);
        }
        function checkObj(obj) {

            obj.index = 0;
            obj.length = $(".v-fade-wrap ._cont li", $(obj)).length;
            obj.clearAutoId = 0;
            obj.time = Number($(obj).attr("data-time"));
            setImgBackground(obj);
            auto(obj.time);

            function auto(time) {

                obj.clearAutoId = setInterval(function () {
                    obj.index = (obj.index + 1) % (obj.length);
                    fadeImg(obj, obj.index);
                }, time);

            }

            $(obj).mouseenter(function () {
               
                $(".v-fade-btn", $(obj)).stop().fadeIn();
                clearInterval(obj.clearAutoId);
            });

            $(obj).mouseleave(function () {
                $(".v-fade-btn", $(obj)).stop().fadeOut();
                auto(obj.time);
            });

            $(".v-fade-btn-l", $(obj)).on("click", function () {

                if (obj.index <= 0) {
                    obj.index = obj.length - 1;
                } else {
                    obj.index = obj.index - 1;
                }
                fadeImg(obj, obj.index);

            });

            $(".v-fade-btn-r", $(obj)).on("click", function () {

                obj.index = (obj.index + 1) % (obj.length);
                fadeImg(obj, obj.index);

            });

            $("._radius-list span", $(obj)).mouseenter(function () {
                obj.index = Number($(this).index());
                fadeImg(obj, obj.index);
            });

            function setImgBackground(el) {
                var els = $(".v-fade-wrap ._cont li", $(el));
                els.each(function () {
                    if ($(this).hasClass("init")) {
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

            }

            function fadeImg(el, index) {
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
                setRadius(index);

                // 触发自定义事件
                lis.eq(index).trigger("v-fade-show", [lis.get(index),index]);

            }

            function setRadius(index) {
                $("._radius-list span", obj).removeClass("active");
                $("._radius-list span", obj).eq(index).addClass("active");
            }
        }
    }

	});

}();

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
            $this.fadeImg(obj, obj.index, false);
        }, $this.options.time);

    };

    VFade.prototype.fadeImg = function (el, index, bl) {

        var obj = this.el;
        var v = $(obj);
        var wrap = v.find(".v-slide-wrap");
        var ul = $(".v-slide-wrap ul ", v);
        var lis = $(".v-slide-wrap ul li", v);

        // set li height
        lis.height(wrap.height());
        var sildeTime = 600;

        if (bl) {
            sildeTime = 0;
        }

        if (this.options.isTopbottom) {
            $(obj).attr("data-topbottom", true);
            var _top = wrap.height() * index;
            ul.stop().animate({
                top: "-" + _top
            }, sildeTime).queue(function () {

                if (index === obj.length - 1) {
                    obj.index = index = (obj.length / 2 - 1);
                    var _top = wrap.height() * index;
                    ul.stop().css("top", -_top);
                }
                if (index === 0) {
                    obj.index = index = obj.length / 2;
                    var _top2 = wrap.height() * index;
                    ul.stop().css("top", -_top2);
                }

            });

        } else {
            $(obj).removeAttr("data-topbottom");
            var _left = wrap.outerWidth() * index;
            ul.stop().animate({
                left: "-" + _left
            }, sildeTime).queue(function () {

                if (index === obj.length - 1) {
                    obj.index = index = (obj.length / 2 - 1);
                    var _left = wrap.outerWidth() * index;
                    ul.stop().css("left", -_left);
                }
                if (index === 0) {
                    obj.index = index = obj.length / 2;
                    var _left2 = wrap.outerWidth() * index;
                    ul.stop().css("left", -_left2);
                }

            });
        }

        lis.eq(index).addClass("active");
        this.setRadius(index % (obj.length / 2));

        // 触发自定义事件
        lis.eq(index).trigger("v-slideshow", [lis.eq(index).get(0), index % (obj.length / 2), (obj.length / 2)]);

    };

    VFade.prototype.setRadius = function (index) {
        $(".radius-list span", this.el).removeClass("active");
        $(".radius-list span", this.el).eq(index).addClass("active");
    };

    VFade.prototype.runing = function () {

        var $this = this;
        var obj = this.el;
        var bannerUl = $(obj).find(".v-slide-wrap ul");
        bannerUl[0].innerHTML += bannerUl[0].innerHTML;

        // 一张图不能轮播
        if ($(".v-slide-wrap ul li", $(obj)).length <= 2) {
            return;
        }

        obj.length = $(".v-slide-wrap ul li", $(obj)).length;
        obj.index = obj.length / 2;
        obj.clearAutoId = 0;

        //setImgBackground(obj);
        this.fadeImg($(obj), obj.index, true);
        this.autoPlay();
        obj.isclick = true;

        $(".v-slide-wrap", $(obj)).hover(function () {
            $(".v-btn", $(obj)).stop().fadeIn();
            clearInterval(obj.clearAutoId);
        }, function () {
            $(".v-btn", $(obj)).stop().fadeOut();
            $this.autoPlay(obj);
        });

        $(".v-btn-l,.v-cst-btn-l", $(obj)).on("click", function () {
            if (obj.isclick) {
                obj.isclick = false;
                var seltid = setTimeout(function () {
                    obj.isclick = true;
                    clearTimeout(seltid);
                }, 700);

                if (obj.index <= 0) {
                    obj.index = obj.length - 1;
                } else {
                    obj.index = obj.index - 1;
                }
                $this.fadeImg(obj, obj.index, false);
            }

        });

        $(".v-btn-r,.v-cst-btn-r", $(obj)).on("click", function () {

            if (obj.isclick) {
                obj.isclick = false;
                var seltid = setTimeout(function () {
                    obj.isclick = true;
                    clearTimeout(seltid);
                }, 600);

                if (obj.index >= obj.length - 1) {
                    obj.index = obj.length - 1;
                } else {
                    obj.index = obj.index + 1;
                }

                $this.fadeImg(obj, obj.index, false);
            }

        });
        var seltid = 0;
        $(".radius-list span", $(obj)).on("click", function () {

            if (obj.isclick) {
                obj.isclick = false;
                seltid = setTimeout(function () {
                    obj.isclick = true;
                    clearTimeout(seltid);
                }, 600);
                var _index = 0;
                var radius_index = Number($(this).index());
                if (obj.index >= (obj.length / 2)) {
                    _index = (radius_index + (obj.length / 2));
                } else {
                    _index = (radius_index);
                }
                $this.fadeImg(obj, _index, false);
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
                // 是否上下scroll
                o.isTopbottom = $this.get(0).hasAttribute("data-topbottom") ? true : false;
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

        $(".v-slide.v-slide-runing").each(function (e) {
            var $this = $(this);
            Plugin.call($this);

        });

    });


}();