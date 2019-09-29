
// v-tab

+function () {

    $(document).on("click", "[data-toggle=v-tab]", function (e) {
        e.preventDefault();

        // btns
        var $p = $(this).closest(".v-tab");
        $(".v-tab-btn", $p).removeClass("active");
        $(this).addClass("active");
        var target = $(this).attr("data-target") || "";

        //  content
        $(".v-tab-cnt-item", $p).removeClass("active");
        $(target, $p).addClass("active");

        // 自定义事件
        $(this).trigger("v-tab", [this, $(target, $p).get(0)]);

    });

}();
