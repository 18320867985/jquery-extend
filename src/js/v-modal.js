
+function () {

    function addHtmlPadding() {
        var win_h = $(window).outerHeight();
        var doc_h = $(document).outerHeight();
        if (doc_h > win_h) {
            $("html").addClass("html-v-modal");
        }}
    //  v-modal
    $(".v-modal").each(function () {

        var $this = $(this);
        var bl = $this.hasClass("in");
     
        // 触发自定义的事件
        $this.trigger("v-modal", [bl, $this.get(0), $this.get(0)]);

        var isBack = $this.attr("data-backdrop") || "true";

        if ("true" === $.trim(isBack)) {

            $(document).on("click", ".v-modal-cnt", function (e) {
                e.stopPropagation();
            });

            $this.find(".v-modal-mask").one("click", function (e) {
                $this.removeClass("in");
                $("html").removeClass("html-v-modal");
                // 触发自定义的事件
                $this.trigger("v-modal", [false, $this.get(0), $this.get(0)]);

            });
        }

    });


    // data-toggle=v-modal
    $(document).on("click", "[data-toggle=v-modal]", function (e) {
    
        var target = $(this).attr("data-target") || "";
        console.log($(target).length);
        var bl = false;
        if ($(target).length > 0) {
          
            $(target).removeClass("in");
            $(target).eq(0).addClass("in");
            addHtmlPadding();
            bl = $(target).eq(0).hasClass("in");
            var p = $(target).closest(".v-modal");
          

            // 触发自定义的事件
            $(target).trigger("v-modal", [bl, $(target).get(0),this]);

            var isBack = $(target).attr("data-backdrop") || "true";
            if ("true" === $.trim(isBack)) {
                $(document).on("click", ".v-modal-cnt", function (e) {
                    e.stopPropagation();
                });

                $(p).find(".v-modal-mask").one("click", function (e) { 
                    $(target).removeClass("in");
                    $("html").removeClass("html-v-modal");
                    // 触发自定义的事件
                    $(target).trigger("v-modal", [false, $(target).get(0),this]);

                });
            }

        }
     

    });

    // [data-dismiss=v-modal]
    $(document).on("click", "[data-dismiss=v-modal]", function () {

        $(this).parents(".v-modal").removeClass("in");
        $("html").removeClass("html-v-modal");
        // 触发自定义的事件
        $(this).trigger("v-modal", [false, $(this).parents(".v-modal").get(0),this]);

    });

  
    $.fn.extend({
        // bl=false=关闭 bl=true=显示, targetEl=目标元素
        VModal: function (bl,targetEl) {
            var $this = $(this);
            if (bl) {
                $this.addClass("in");
                addHtmlPadding();
                var isBack = $this.attr("data-backdrop") || "true";
             
                if ("true" === $.trim(isBack)) {

                    $(document).on("click", ".v-modal-cnt", function (e) {
                        e.stopPropagation();
                    });

                    $this.find(".v-modal-mask").one("click", function (e) {
                        $this.removeClass("in");
                        $("html").removeClass("html-v-modal");
                        // 触发自定义的事件
                        $this.trigger("v-modal", [false, $this.get(0), targetEl]);
                    });
                }
                // 触发自定义的事件
                $this.trigger("v-modal", [true, $(this).get(0), targetEl]);

            } else {
                $this.removeClass("in");
                $("html").removeClass("html-v-modal");

                // 触发自定义的事件
                $this.trigger("v-modal", [false, $(this).get(0), targetEl]);
            }
          
           
         
        }
    });



}();