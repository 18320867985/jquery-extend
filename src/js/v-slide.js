
/**jq extend

< !--自定义按钮 class= v-cst-btn-l v-cst-btn-r -->

    <div class="_cst-v-btns">
        <a href="javascript:;" class="v-cst-btn-l">
            <span class="iconfont iconarow-l"></span>
        </a>
        <span class="_span1">1</span>
        <span class="_span2">/</span>
        <span class="_span3">2</span>
        <a href="javascript:;" class="v-cst-btn-r">
            <span class="iconfont iconarow-r"></span>
        </a>
    </div>

**/
+function () {

    $.fn.extend({

        vslide: function () {

            for (var i = 0; i < this.length; i++) {
                checkObj(this[i]);
            }

            function checkObj(obj) {

                var bannerUl = $(obj).find(".v-slide-wrap ul");
                bannerUl[0].innerHTML += bannerUl[0].innerHTML;

                // 一张图不能轮播
                if ($(".v-slide-wrap ul li", $(obj)).length <= 2) {
                    return;
                }
                obj.length = $(".v-slide-wrap ul li", $(obj)).length;
                obj.index = obj.length / 2;
                obj.clearAutoId = 0;
                obj.time = Number($(obj).attr("data-time"));
                obj.isTopbottom = obj.hasAttribute("data-topbottom"); // 是否上下scroll
              
                //setImgBackground(obj);
                fadeImg($(obj), obj.index, true);
                auto(obj.time);
                obj.isclick = true;

                function auto(time) {

                    obj.clearAutoId = setInterval(function () {
                        obj.index = (obj.index + 1) % (obj.length);
                        fadeImg(obj, obj.index, false);
                    }, time);

                }

                $(".v-slide-wrap", $(obj)).hover(function () {
                    $(".v-btn", $(obj)).stop().fadeIn();
                    clearInterval(obj.clearAutoId);
                }, function () {
                    $(".v-btn", $(obj)).stop().fadeOut();
                    auto(obj.time);
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
                        fadeImg(obj, obj.index, false);
                    }

                });

                $(".v-btn-r,.v-cst-btn-r", $(obj)).on("click", function () {
                   
                    if (obj.isclick) {
                        obj.isclick = false;
                        var seltid = setTimeout(function () {
                            obj.isclick = true;
                            clearTimeout(seltid);
                        }, 700);

                        //obj.index = (obj.index + 1) % (obj.length);
                        if (obj.index >= obj.length - 1) {
                            obj.index = obj.length - 1;
                        } else {
                            obj.index = obj.index + 1;
                        }
                       
                      
                        fadeImg(obj, obj.index, false);
                    }

                });
                var seltid = 0;
                $(".radius-list span", $(obj)).on("click", function () {

                    if (obj.isclick) {
                        obj.isclick = false;
                        seltid = setTimeout(function () {
                            obj.isclick = true;
                            clearTimeout(seltid);
                        }, 700);
                        var _index = 0;
                        var radius_index = Number($(this).index());
                        if (obj.index >= (obj.length / 2)) {
                            _index = (radius_index + (obj.length / 2));
                        } else {
                            _index = (radius_index);
                        }
                        fadeImg(obj, _index, false);
                    }

                });



                function fadeImg(el, index, bl) {
                    var v = $(el).closest($(obj));
                    var wrap = v.find(".v-slide-wrap");
                    var ul = $(".v-slide-wrap ul ", v);
                    var lis = $(".v-slide-wrap ul li", v);

                    // set li height
                    lis.height(wrap.height());

                    //	ul[0].style.transform="translateX(-"+wrap.outerWidth()*index+"px)"
                    //	ul[0].style.transition="1s"
                    var sildeTime = 600;

                    if (bl) {
                        sildeTime = 0;
                    }

      
                    // is scroll topbottom 
                    if (obj.isTopbottom) {
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
                    //obj.isclick = true;
                    lis.eq(index).addClass("active");
                    setRadius(index % (obj.length / 2));

                    // 触发自定义事件
                    lis.eq(index).trigger("v-slideshow", [lis.eq(index).get(0), index % (obj.length / 2), (obj.length / 2)]);

                }

                function setRadius(index) {
                    $(".radius-list span", obj).removeClass("active");
                    $(".radius-list span", obj).eq(index).addClass("active");
                }
            }

        }

    });
}();

