
/**
 * hqs v-slide
**/
+function () {

    'use strict';

    // define class
    var VSlide = function (el,options) {
        this.options = options;
        this.el = el;
        this.runing();
    };

    VSlide.DEFAULTS = {
        time: 3000,
        isTopbottom:false
        
    };

    VSlide.prototype.autoPlay = function () {

        var obj = this.el;
        var $this = this;
      
        obj.clearAutoId = setInterval(function () {
            obj.index = (obj.index + 1) % (obj.length);
            $this.fadeImg(obj, obj.index, false);
        }, $this.options.time);

    };

    VSlide.prototype.fadeImg = function (el, index, bl) {
     
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

    VSlide.prototype.setRadius = function (index) {
        $(".radius-list span", this.el).removeClass("active");
        $(".radius-list span", this.el).eq(index).addClass("active");
    };

    VSlide.prototype.runing = function () {
       
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
            var data = $this.data('v-slide');
            var options = typeof option === 'object' && option;

            if (!data) {
                var o = {};
                o.time = parseInt($this.attr("data-time")) || VSlide.DEFAULTS.time;
                // 是否上下scroll
                o.isTopbottom = $this.get(0).hasAttribute("data-topbottom") ? true : false;
                var p = $.extend({}, o, options);
              
                $this.data('v-slide', data = new VSlide(this,p));
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

