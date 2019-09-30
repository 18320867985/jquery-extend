/**jq extend**/
+function($){
	
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

}($);