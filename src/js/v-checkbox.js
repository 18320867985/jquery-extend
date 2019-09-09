
/*
 * v-checkbox 组件
 	
 	<div class="v-checkbox" >
		<span class="v-checkbox-item iconfont"></span>
	</div>
	
	 // 自定义事件
	$(".v-checkbox").on("v-checkbox", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".v-checkbox").VueCheckbox(true,fn);
	fn回调执行的函数
	$(".v-checkbox").VueCheckbox(true, (el) => {
		$(el).parents("li").addClass("active");
	});
	
	// get
	 var v=$(".v-checkbox").VueCheckbox();
	 alert(v)
 * */


(function() {
	
	// 单选 v-checkbox
	$(document).on("click", ".v-checkbox  .v-checkbox-item", function() {
		
        $(this).toggleClass("active");
        var bl = $(this).hasClass("active");	
		// 触发自定义的事件
		$(this).trigger("v-checkbox", [bl,this]);
	});
	
	// 单选 v-checkbox
	$(document).on("click", ".v-checkbox  .v-checkbox-text", function() {
		
		var p=$(this).parents(".v-checkbox");
		$(".v-checkbox-item",p).toggleClass("active");
		var bl=$(".v-checkbox-item",p).hasClass("active");
		
        // 触发自定义的事件
        $(this).trigger("v-checkbox", [bl, this]);
	});
	
	
	$.fn.extend({

        VCheckbox: function (v) {
    
            if (arguments.length>0) {
				v=!!v;
				if(v){
					$(this).find(".v-checkbox-item").addClass("active");
                    // 触发自定义的事件
                    $(this).trigger("v-checkbox", [true, $(this).get(0)]);
				}else{
					$(this).find(".v-checkbox-item").removeClass("active");
                    // 触发自定义的事件
                    $(this).trigger("v-checkbox", [false, $(this).get(0)]);
				}
				
			} else {

				return $(this).find(".v-checkbox-item").hasClass("active");
			}
		}
	});
	
	
})();


/* v-checkbox-group 组件
	<div class="v-checkbox-group">
		<div class="v-checkbox-group-item">
			<span class="v-checkbox-item iconfont" data-val="js"></span>
			<span class="v-checkbox-text">js</span>
		</div>
		<div class="v-checkbox-group-item">
			<span class="v-checkbox-item iconfont" data-val="jquery"></span>
			<span class="v-checkbox-text">jquery</span>
		</div>
		<div class="v-checkbox-group-item">
			<span class="v-checkbox-item iconfont" data-val="c#"></span>
			<span class="v-checkbox-text">c#</span>
		</div>

	</div>
	
	 // 自定义事件
		$(".v-checkbox-group").on("v-checkbox-group", function(event, el,bl) {
	
			$.alert("选择的值为:"+bl);
		});
		
		//set 
		$(".v-checkbox-group").VueCheckboxGroup([2,4]);
		
		// get
		var v=$(".v-checkbox-group").VueCheckboxGroup();
		alert(v)
		
		//set 
		//var dst = ["js", "c#"];
		//$(".v-checkbox-group").VueCheckboxGroup(item=>dst.some(o => o == item));
		// get
		//var v=$(".v-checkbox-group").VueCheckboxGroup();
	*/
   
   
(function () {
    // 单选组 v-checkbox-group
    $(document).on("click", ".v-checkbox-group  .v-checkbox-item", function () {
        $(this).toggleClass("active");
        var p = $(this).parents(".v-checkbox-group");
		var vals=[];
        $(".v-checkbox-item.active",p).each(function(){
            var v = $(this).attr("data-val");
			vals.push(v);
			
		});

        // 触发自定义的事件
        $(this).trigger("v-checkbox-group", [vals, p]);

    });

    $.fn.extend({
        VChekboxGroup: function (args) {
            var items = $(this).find(".v-checkbox-item");

            if (typeof args === "function") {
                var list = [];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    $(item).removeClass("active");
                    var val = $(item).attr("data-val") || "";
                    var bl = args(val);
                    if (bl) {
                        $(item).addClass("active");
                        list.push(val); 
                    } 
                }
                // 触发自定义的事件
                $(this).trigger("v-checkbox-group", [list, this]);

                return;
            }

            // 全选 与 反选
            else if (typeof args === "boolean") {
              
                var list1 = [];
                items.each(function () {
                        if (args) {
                            $(this).addClass("active");
                            list1.push($(this).attr("data-val") || "");
                        } else {
                            $(this).removeClass("active");
                          
                        }
                 });

                 // 触发自定义的事件
                 $(this).trigger("v-checkbox-group", [list1, this]);

              

            }

            else if (args instanceof Array) {
                var list2 = [];
                for (var i2 = 0; i2 < items.length; i2++) {
                    var item2 = items[i2];
                    $(item2).removeClass("active");
                    for (var y = 0; y < args.length; y++) {
                        var v = $(item2).attr("data-val")||"";
                        if ( v=== args[y]) {
                            $(item2).addClass("active");
                            list2.push(v);
                            break;
                          
                        } 
                    }
                }
                // 触发自定义的事件
                $(this).trigger("v-checkbox-group", [list2, this]);
            } else {
                var arrs = [];
                items.each(function () {
               
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
    
   })();


/*
 * v-radiobox 组件
 	
 	<div class="v-radiobox" >
		<span class="v-radiobox-item iconfont">慢</span>
		<span class="v-radiobox-item iconfont">中</span>
		<span class="v-radiobox-item iconfont">快</span>
	</div>
	
	 // 自定义事件
	$(".v-radiobox").on("v-radiobox", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	//set 1
	$(".v-radiobox").VRadiobox(1);
	
	//set2
	var v="快";
	$(".v-radiobox").VRadiobox((val)=>{
		return	val==v;
			
	});
	
	//get
	var v=$(".v-radiobox").VRadiobox();
	alert(v);

	
	
 * */


(function () {

    // 单选 v-radiobox
    $(document).on("click", ".v-radiobox-item", function () {
     
        var p = $(this).parents(".v-radiobox-group");
        $(".v-radiobox-item", p).removeClass("active");
        $(this).addClass("active");
        var v=  $(this).attr("data-val") || "";

        // 触发自定义的事件
        $(this).trigger("v-radiobox-group", [v,this]);
    });


    $.fn.extend({

        VRadioboxGroup: function (args) {
            var items = $(this).find(".v-radiobox-item");
            if (typeof args === "string") {
                items.removeClass("active");
                var v = "";
                items.each(function () {
                    var v2 = $(this).attr("data-val") || "";
                    if ($.trim(v2) === args) {
                        $(this).addClass("active");
                        v = v2; 
                        return false;
                    }
                });

                // 触发自定义的事件
                $(this).trigger("v-radiobox-group", [v, $(this).find(".v-radiobox-item.active").get(0)]);
               
            }

            else if (typeof args === "number") {
               
                  items.removeClass("active");
                if (args > 0) {
                    args = args >= 1 ? args - 1 : 0;
                    items.eq(args).addClass("active");
                }

                return;
            }

            else if (typeof args === "function") {
              
                items.removeClass("active");
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var val = $(item).attr("data-val") || "";
                    var bl = args(val);
                    if (bl) {
                        $(item).addClass("active");
                        break;
                    } else {
                        $(item).removeClass("active");
                    }
                }

                return;
            } else {
                return $(this).find(".v-radiobox-item.active").attr("data-val")||"";
            }


        }
    });


})();