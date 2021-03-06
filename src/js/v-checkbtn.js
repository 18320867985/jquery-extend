/*
 hqs  v-checkbtn
 * */

(function () {

    // 单选
    $(document).on("click", ".v-checkbtn .v-checkbtn-item", function (e) {
        e.preventDefault();
        $(this).toggleClass("active");
        var bl = $(this).hasClass("active");

        // 触发自定义的事件
        $(this).trigger("v-checkbtn", [bl, this]);
    });


    $.fn.extend({

        vcheckbtn: function (v) {
            if (typeof v !== "undefined") {
                v = !!v;

                if (v) {
                    $(this).find(".v-checkbtn-item").addClass("active");
                    $(this).trigger("v-checkbtn", [true, $(this).find(".v-checkbtn-item")[0]]);
                } else {
                    $(this).find(".v-checkbtn-item").removeClass("active");
                    $(this).trigger("v-checkbtn", [false, $(this).find(".v-checkbtn-item")[0]]);
                }

            } else {

                return $(this).find(".v-checkbtn-item").hasClass("active");
            }
        }
    });

    $(document).on("click", ".v-checkbtn-group .v-checkbtn-item", function (e) {

        e.preventDefault();
        $(this).toggleClass("active");
        var arrs = [];
        var p = $(this).parents(".v-checkbtn-group");
        $(".v-checkbtn-item", p).each(function () {

            if ($(this).hasClass("active")) {
                var v = $(this).attr("data-val") || "";
                if ($.trim(v) !== "") {
                    arrs.push(v);
                }
            }

        });

        // 触发自定义的事件
        $(this).trigger("v-checkbtn-group", [arrs]);
    });


    $.fn.extend({

        vcheckbtngroup: function (args) {
            var items = $(this).find(".v-checkbtn-item");
            var arrs = [];
            if (typeof args === "function") {

                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var val = $(item).attr("data-val") || "";
                    var bl = args(val);
                    if (bl) {
                        $(item).addClass("active");
                    } else {
                        $(item).removeClass("active");
                    }
                }
                // 触发自定义的事件
                var list = [];
                $(".v-checkbtn-item", this).each(function () {
                    if ($(this).hasClass("active")) {
                        var v = $(this).attr("data-val") || "";
                        if ($.trim(v) !== "") {
                            list.push(v);
                        }
                    }

                });

                $(this).trigger("v-checkbtn-group", [list]);

                return;
            }

            else if (args instanceof Array) {
                var list2 = [];

                for (var i2 = 0; i2 < items.length; i2++) {
                    var item2 = items[i2];
                    var v = $(item2).attr("data-val") || "";
                    for (var y = 0; y < args.length; y++) {
                        if (v === args[y]) {
                            $(item2).addClass("active");

                            break;
                        } else {
                            $(item2).removeClass("active");
                        }
                    }

                    // 触发自定义的事件
                    list2 = [];
                    $(".v-checkbtn-item", this).each(function () {
                        if ($(this).hasClass("active")) {
                            var v = $(this).attr("data-val") || "";
                            if ($.trim(v) !== "") {
                                list2.push(v);
                            }
                        }

                    });

                }

                $(this).trigger("v-checkbtn-group", [list2]);

            }
            // 全选 与 反选
            else if (typeof args === "boolean") {

                var objs = $(this).find(".v-checkbtn-item");
                var objs_list = [];
                objs.each(function () {
                    if (args) {
                        var v = $(this).attr("data-val") || "";
                        $(this).addClass("active");
                        objs_list.push(v);
                    } else {

                        $(this).removeClass("active");

                    }

                    $(this).trigger("v-checkbtn-group", [objs_list]);


                });

            }
            else {

                $(".v-checkbtn-item", this).each(function () {
                    if ($(this).hasClass("active")) {
                        var v = $(this).attr("data-val") || "";
                        if ($.trim(v) !== "") {
                            arrs.push(v);
                        }
                    }

                });

                return arrs;
            }

        }
    });

  
    $(document).on("click", ".v-radiobtn-item", function (e) {
        e.preventDefault();
        var p = $(this).parents(".v-radiobtn-group");
        p.find(".v-radiobtn-item").removeClass("active");
        $(this).addClass("active");

        // 触发自定义的事件
        $(this).trigger("v-radiobtn-group", [$(this).attr("data-val"), this]);
    });

    $.fn.extend({

        vradiobtngroup: function (index) {

            if (arguments.length >= 1) {
                if (!isNaN(index)) {
                    index = Number(index);
                    $(this).find(".v-radiobtn-item").removeClass("active");
                    $(this).find(".v-radiobtn-item").eq(index).addClass("active");

                    // 触发自定义的事件
                    var $active = $(this).find(".v-radiobtn-item.active");
                    $(this).trigger("v-radiobtn-group", [$active.attr("data-val") || "", $active.get(0)]);
                }
                else if (typeof index === "string") {
                    var $list = $(this).find(".v-radiobtn-item");
                    $list.removeClass("active");
                    $list.each(function () {

                        var v = $.trim($(this).attr("data-val") || "");
                        if (index === v) {
                            $(this).addClass("active");
                        }

                    });

                    // 触发自定义的事件
                    var $active2 = $(this).find(".v-radiobtn-item.active");
                    $(this).trigger("v-radiobtn-group", [$active2.attr("data-val") || "", $active2.get(0)]);
                }
            } else {

                return $(this).find(".v-radiobtn-item.active").attr("data-val") || "";
            }
        }
    });

})();

