/**
 * hqs v-autoSlide
 **/
+ function () {

    'use strict';

    // define class
    var VAutoSlide = function (el, options) {
        this.options = options;
        this.el = el;
        this.running();
    };

    VAutoSlide.DEFAULTS = {
        time: 20,
        isTopbottom: false

    };

    VAutoSlide.prototype.autoPlay = function () {

        var obj = this.el;
        var $this = this;

        obj.clearAutoId = setInterval(function () {
            //obj.index = 2;//(obj.index + 1) % (obj.length);
            $this.fadeImg(obj, obj.index, false);
        }, 100);

    };

    VAutoSlide.prototype.fadeImg = function (el, index, bl) {

        var obj = this.el;

        var v = $(obj);
        var wrap = v.find(".v-autoslide-wrap");
        var ul = $(".v-autoslide-wrap ul ", v);
        var lis = $(".v-autoslide-wrap ul li", v);

        // set li height
        lis.height(wrap.height());
        var sildeTime = 600;

        if (bl) {
            sildeTime = 0;
        }

        if (this.options.isTopbottom) {
            // $(obj).attr("data-topbottom", true);
            // var _top = wrap.height() * index;
            // ul.stop().animate({
            //     top: "-" + _top
            // }, sildeTime).queue(function () {

            //     if (index === obj.length - 1) {
            //         obj.index = index = (obj.length / 2 - 1);
            //         var _top = wrap.height() * index;
            //         ul.stop().css("top", -_top);
            //     }
            //     if (index === 0) {
            //         obj.index = index = obj.length / 2;
            //         var _top2 = wrap.height() * index;
            //         ul.stop().css("top", -_top2);
            //     }

            // });

        } else {
            $(obj).removeAttr("data-topbottom");
            obj.length = $(".v-autoslide-wrap ul li", $(obj)).length / 2;
            var maxWidth = obj.length * $(".v-autoslide-wrap ul li").width()
            obj.left += 2;
            if (obj.left >= maxWidth) {
                obj.left = 0;
            }
            console.log(obj.left)
            ul.css("left", -obj.left + "px");

        }

        //lis.eq(index).addClass("active");
        // this.setRadius(index % (obj.length / 2));

        // 触发自定义事件
        // lis.eq(index).trigger("v-autoslide-show", [lis.eq(index).get(0), index % (obj.length / 2), (obj.length / 2)]);

    };



    VAutoSlide.prototype.running = function () {

        var $this = this;
        var obj = this.el;
        obj.left = 0;
        var bannerUl = $(obj).find(".v-autoslide-wrap ul");
        bannerUl[0].innerHTML += bannerUl[0].innerHTML;

        // 一张图不能轮播
        // if ($(".v-autoslide-wrap ul li", $(obj)).length <= 2) {
        //     return;
        // }

        // obj.length = $(".v-autoslide-wrap ul li", $(obj)).length;
        // obj.index = obj.length / 2;
        // obj.clearAutoId = 0;

        //setImgBackground(obj);
        this.fadeImg($(obj), obj.index, true);
        this.autoPlay();
        obj.isclick = true;

        $(".v-autoslide-wrap", $(obj)).hover(function () {
            // $(".v-btn", $(obj)).stop().fadeIn();
            clearInterval(obj.clearAutoId);
        }, function () {
            // $(".v-btn", $(obj)).stop().fadeOut();
            $this.autoPlay(obj);
        });


    };

    function Plugin(option) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-autoslide');
            var options = typeof option === 'object' && option;

            if (!data) {
                var o = {};
                o.time = parseInt($this.attr("data-time")) || VAutoSlide.DEFAULTS.time;
                // 是否上下scroll
                o.isTopbottom = $this.get(0).hasAttribute("data-topbottom") ? true : false;
                var p = $.extend({}, o, options);

                $this.data('v-autoslide', data = new VAutoSlide(this, p));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vautoslide = $.fn.vautoslide;
    $.fn.vautoslide = Plugin;

    $(function () {

        $("[data-toggle=v-autoslide]").each(function (e) {
            var $this = $(this);
            Plugin.call($this);

        });

    });

}();