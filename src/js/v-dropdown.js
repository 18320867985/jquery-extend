
/*
 v-dropdown
 */
+function () {
 
    $(function () {

        $("[data-toggle=v-dropdown].v-dropdown").each(function () {
            var $this = $(this);
           
            var eventType = $this.attr("data-event") || "click";
            if (eventType === "hover") {
                eventType = "mouseenter";
            }
            
            eventType = $.trim(eventType);

            // click  hover 类型事件 具有冒泡行为
            if (eventType === "click" || eventType === "mouseenter") {
                $(document).on(eventType, ".v-dropdown-btn", function (e) {

                    var p2 = $(this).parents(".v-dropdown").get(0);
                    if (p2 === $this.get(0)) {
                        e.stopPropagation();
                        $(".v-dropdown").removeClass("in");
                        $(this).parents(".v-dropdown").addClass("in");

                        $(document).one("click", function (e) {
                            $this.removeClass("in");
                        });

                        // 点击按钮 触发自定义的事件
                        $(this).trigger("v-dropdown-btn", [this]);

                        if (eventType === "mouseenter") {
                            $(".v-dropdown-btn").each(function () { this.blur(); });}
                    }

                });

                //  mouseenter mouseleave
                if (eventType === "mouseenter") {
                    $this.on("mouseleave", function (e) {
                        $(".v-dropdown").removeClass("in");

                    });
                }

            } else {

                // 没有冒泡行为 focus 类型事件
                $this.find(".v-dropdown-btn").on(eventType, function (e) {
                    e.stopPropagation();
                  
                        $(".v-dropdown").removeClass("in");
                        $(this).parents(".v-dropdown").addClass("in");
                        $(document).one("click", function (e) {
                            $this.removeClass("in");
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
                    $(this).parents(".v-dropdown").removeClass("in");

                    // 选择列表项 触发自定义的事件
                    $(this).trigger("v-dropdown-select", [this]);
                }
             
            });

        });

    });
 
}();