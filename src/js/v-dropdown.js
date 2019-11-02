
/*
 hqs v-dropdown
 */

+function () {

    'use strict';

    // define class
    var VDropdown = function (el, options) {
        this.options = options;
        this.el = el;
        this.runing();
    };

    VDropdown.prototype.runing = function () {

        var $this = $(this.el);
        var eventType = $this.attr("data-event") || "click";
        if (eventType === "hover") {
            eventType = "mouseenter";
        }

        // data-click-hide 阻止冒泡

        var isStop = $this.closest(".v-dropdown").get(0).hasAttribute("data-click-hide") || false;
        eventType = $.trim(eventType);

        // click  hover 类型事件 具有冒泡行为
        if (eventType === "click" || eventType === "mouseenter") {

            $(document).on(eventType, ".v-dropdown-btn", function (e) {

                var p2 = $(this).parents(".v-dropdown").get(0);
                if (p2 === $this.get(0)) {
                    e.stopPropagation();
                    $(".v-dropdown").removeClass("in out");
                    $(this).parents(".v-dropdown").addClass("in");

                    $(document).one("click ", function (e) {
                        $(".v-dropdown").removeClass("in out");
                        $this.addClass("out");

                    });

                    // 点击按钮 触发自定义的事件
                    $(this).trigger("v-dropdown-btn", [this]);

                    if (eventType === "mouseenter") {
                        $(".v-dropdown-btn").blur();
                    }
                }

            });

            //  mouseenter mouseleave
            if (eventType === "mouseenter") {
                $this.on("mouseleave", function (e) {
                    $(".v-dropdown").removeClass("in out");
                    $(".v-dropdown-btn").blur();
                    $(this).addClass("out");

                });
            }

        } else {

            // 没有冒泡行为 focus 类型事件
            $this.on(eventType, ".v-dropdown-btn", function (e) {
                e.stopPropagation();
                $(".v-dropdown").removeClass("in out");
                $(this).closest(".v-dropdown").addClass("in");

                $(document).one("click", function (e) {
                    $(".v-dropdown").removeClass("in out");
                    $this.addClass("out");
                });

                // 点击按钮 触发自定义的事件
                $(this).trigger("v-dropdown-btn", [this]);
            });

        }

        $(document).on("click", ".v-dropdown-btn", function (e) {
            e.stopPropagation();
        });

        $(document).on("click", ".v-dropdown-menu a", function (e) {

            var p2 = $(this).parents(".v-dropdown").get(0);
            if (p2 === $this.get(0)) {

                $(document).off("click", ".v-dropdown");
                if (isStop) {
                    e.stopPropagation();
                } else {
                    $(this).parents(".v-dropdown").removeClass("in").addClass("out");
                }
                if ($(this).hasClass("_not-item")) { return; }
                // 选择列表项 触发自定义的事件
                $(this).trigger("v-dropdown-select", [this]);
            }

        });

        //  data-click-hide 为true 阻止冒泡
        $(document).on("click", ".v-dropdown-menu", function (e) {
            if (isStop) {
                e.stopPropagation();
            }
        });

    };

    // 是否为移动端
    VDropdown.prototype.isMobile = function () {

        var userAgentInfo = navigator.userAgent.toString().toLowerCase();
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        //console.log(userAgentInfo)
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v].toLowerCase()) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    };


    function Plugin(option) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-dropdwon');
            var options = typeof option === 'object' && option;

            if (!data) {
                var p = $.extend({}, options);
                $this.data('v-dropdwon', data = new VDropdown(this, p));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vdropdown = $.fn.vdropdown;
    $.fn.vdropdown = Plugin;


    $(function () {
        $("[data-toggle=v-dropdown].v-dropdown").each(function () {
            var $this = $(this);
            Plugin.call($this);
        });

    });


}();