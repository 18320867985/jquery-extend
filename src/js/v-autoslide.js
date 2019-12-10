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
        time: 100,
        slideVal: 2,
        isTopbottom: false

    };

    VAutoSlide.prototype.autoPlay = function () {

        var obj = this.el;
        var $this = this;

        obj.clearAutoId = setInterval(function () {
            $this.fadeImg();
        }, VAutoSlide.DEFAULTS.time);

    };

    VAutoSlide.prototype.fadeImg = function () {

        var obj = this.el;
        var v = $(obj);
        var wrap = v.find(".v-autoslide-wrap");
        var ul = $(".v-autoslide-wrap>ul ", v);
        var lis = $(".v-autoslide-wrap>ul>li", v);

        if (this.options.isTopbottom) {
            $(obj).attr("data-topbottom", true);
            obj.length = $(".v-autoslide-wrap>ul>li", $(obj)).css("display", "block").length / 2;
            var maxHeight = obj.length * $(".v-autoslide-wrap>ul>li", $(obj)).height();
            obj.top += VAutoSlide.DEFAULTS.slideVal;
            if (obj.top >= maxHeight) {
                obj.top = 0;
            }
            // console.log(obj.top)
            ul.css("top", -obj.top + "px");
            // 触发自定义事件
            ul.trigger("v-autoslide-slide", [ul.get(0), obj.top]);


        } else {
            lis.height(wrap.height());
            $(obj).removeAttr("data-topbottom");
            obj.length = $(".v-autoslide-wrap>ul>li", $(obj)).length / 2;
            var maxWidth = obj.length * $(".v-autoslide-wrap>ul>li", $(obj)).width();
            obj.left += VAutoSlide.DEFAULTS.slideVal;
            if (obj.left >= maxWidth) {
                obj.left = 0;
            }
            // console.log(obj.left)
            ul.css("left", -obj.left + "px");
            // 触发自定义事件
            ul.trigger("v-autoslide-slide", [ul.get(0), obj.left]);

        }


    };

    VAutoSlide.prototype.running = function () {

        var $this = this;
        var obj = this.el;
        obj.left = 0;
        obj.top = 0;
        var bannerUl = $(obj).find(".v-autoslide-wrap>ul");
        bannerUl[0].innerHTML += bannerUl[0].innerHTML;

        this.fadeImg($(obj), obj.index, true);
        this.autoPlay();
        obj.isclick = true;

        $(".v-autoslide-wrap", $(obj)).hover(function () {
            clearInterval(obj.clearAutoId);
        }, function () {
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