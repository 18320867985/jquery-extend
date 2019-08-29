/*
 * v-checkbtn 组件
 * <div class="v-checkbtn">
		<div class="v-checkbtn-item " data-val="true">
			爱心
		</div>
	</div>
	
	 // 自定义事件
	$(".v-checkbtn").on("v-checkbtn", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".v-checkbtn.a1").VuecheCkbtn(true);
	// get
	 var v=$(".v-checkbtn.a1").VueCheckbtn();
	 alert(v)
	
 * */

(function() {
	
	// 单选
	$(document).on("click", ".v-checkbtn .v-checkbtn-item", function() {

        $(this).toggleClass("active");
        var bl = $(this).hasClass("active");

		// 触发自定义的事件
		$(this).trigger("v-checkbtn", [bl]);
	});
	

$.fn.extend({

		VueCheckbtn: function(v) {
			if(typeof v!=="undefined") {
				v=!!v;
				
				if(v){
					$(this).find(".v-checkbtn-item").addClass("active");
				}else{
					$(this).find(".v-checkbtn-item").removeClass("active");
				}
				
			} else {

				return $(this).find(".v-checkbtn-item").hasClass("active");
			}
		}
	});
	
	
	// 多选
	
	/*
 	* v-checkbtn-group 组件
	 <div class="v-checkbtn-group">
			<div class="v-checkbtn-item " data-val="js">js</div>
			<div class="v-checkbtn-item " data-val="jquery">jquery</div>
			<div class="v-checkbtn-item " data-val="java">java</div>
			<div class="v-checkbtn-item " data-val="c#">c#</div>
			<div class="v-checkbtn-item " data-val="nodejs">nodejs</div>
			</div>
	</div>
	
	// v-checkbtn-group自定义事件
	$(".v-checkbtn-group").on("v-checkbtn-group", function(event, el,bl,arrs) {
		
		$.alert("选择的值为:"+arrs);
	});
	
	//set 
	$(".v-checkbtn-group").VueCheckbtnGroup(["js","c#"]);
	
	// get
	var v=$(".v-checkbtn-group").VueCheckbtnGroup();
	alert(v)
	
	//set 
	//var dst = ["视频监控", "音视频通话", "查看机器人状态","设置机器人"];
	//$(" ._select-module .v-checkbtn-group").VueCheckbtnGroup(item=>dst.some(o => o == item));
	// get
	//var v=$("._select-module .v-checkbtn-group").VueCheckbtnGroup();
 * */

	$(document).on("click", ".v-checkbtn-group .v-checkbtn-item", function() {

        $(this).toggleClass("active");
        var bl = $(this).hasClass("active");
        var arrs = [];
        var p = $(this).parents(".v-checkbtn-group");
        $(".v-checkbtn-item", p).each(function () {

            if ($(this).hasClass("active")) {
                var v = $(this).attr("data-val") || "";
                if (v.trim() !== "") {
                    arrs.push(v);
                }
            }

        });
        
		// 触发自定义的事件
		$(this).trigger("v-checkbtn-group", [bl,arrs]);
	});
	
	
	$.fn.extend({

		VueCheckbtnGroup: function(args) {
			var items=$(this).find(".v-checkbtn-item");
			if(typeof args==="function"){
			
                for (var i = 0; i < items.length; i++){
                    var item = items[i];
					var val=$(item).attr("data-val")||"";
					var bl=args(val);
					if(bl){
						$(item).addClass("active");	
					}else{
						$(item).removeClass("active");	
					}
				}
				
				return;
			}
			
		else if( args instanceof Array){
                for(var i2=0; i2<items.length; i2++){
                    var item2 = items[i2];
                    var v = $(item2).attr("data-val") || "";
					for(var y=0; y<args.length; y++){
                        if (v === args[y]) {
                            $(item2).addClass("active");
                            break;
                        } else {
                            $(item2).removeClass("active");
                        }
					}
					
				}
				
			}else{
				var arrs = [];
				$(".v-checkbtn-item", this).each(function() {
					if($(this).hasClass("active")) {
						var v = $(this).attr("data-val") || "";
						if(v.trim() !== "") {
							arrs.push(v);
						}
					}

				});
				
				return arrs;
			}
			
		}
	});
	
})();


