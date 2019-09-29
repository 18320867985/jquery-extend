
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
           // data-click-hide=true Ϊtrue ��ֹð��
            var isStop = $(this).closest(".v-dropdown").attr("data-click-hide");
            eventType = $.trim(eventType);

            // click  hover �����¼� ����ð����Ϊ
            if (eventType === "click" || eventType === "mouseenter") {

             
                $(document).on(eventType, ".v-dropdown-btn", function (e) {
                  
                    var p2 = $(this).parents(".v-dropdown").get(0);
                    if (p2 === $this.get(0)) {
                        e.stopPropagation();
                        $(".v-dropdown").removeClass("in out");
                        $(this).parents(".v-dropdown").addClass("in");

                        $(document).one("click", function (e) {
                            $(".v-dropdown").removeClass("in out");
                            $this.addClass("out");
                               
                        });

                        // �����ť �����Զ�����¼�
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
               
                // û��ð����Ϊ focus �����¼�
                $this.find(".v-dropdown-btn").on(eventType, function (e) {
                    e.stopPropagation();
                    $(".v-dropdown").removeClass("in out");
                    $(this).closest(".v-dropdown").addClass("in");
                   
                    $(document).one("click", function (e) {
                        $(".v-dropdown").removeClass("in out");
                        $this.addClass("out");
                    });

                        // �����ť �����Զ�����¼�
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
                      
                    // ѡ���б��� �����Զ�����¼�
                    $(this).trigger("v-dropdown-select", [this]);
                }
             
            });

            //  data-click-hide Ϊtrue ��ֹð��
            $(document).on("click", ".v-dropdown-menu", function (e) {
                if (isStop) {
                    e.stopPropagation();
                }
            });

        });

    });
 
}();