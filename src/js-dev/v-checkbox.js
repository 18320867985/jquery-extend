
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
            console.log(v)
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
   
   
   (function() {
   	
   	// 单选组 v-checkbox-group
   	$(document).on("click", ".v-checkbox-group  .v-checkbox-item", function() {
   		
   		$(this).toggleClass("active");
    	var p=$(this).parents(".v-checkbox-group");
		var vals=[];
		$(".v-checkbox-item.active",p).each(function(){
			var v=$(this).attr("data-val");
			vals.push(v);
			
		});
    		
   		// 触发自定义的事件
   		$(this).trigger("v-checkbox-group", [this,vals]);
   	});
   	
   	// 单选 v-checkbox
   	$(document).on("click", ".v-checkbox-group  .v-checkbox-text", function() {
   		
   		var p=$(this).parents(".v-checkbox-group-item");
   		$(".v-checkbox-item",p).toggleClass("active");
   		var p2=$(this).parents(".v-checkbox-group");
   		var vals=[];
   		$(".v-checkbox-item.active",p2).each(function(){
   			var v=$(this).attr("data-val");
   			vals.push(v);
   			
   		});
   		
   		// 触发自定义的事件
   		$(this).trigger("v-checkbox-group", [this,vals]);
   	});
   	
   	
   	$.fn.extend({
   
   		VueCheckboxGroup: function(args) {
   			
   						if(typeof args==="function"){
   							var items=$(this).find(".v-checkbox-item");
   							for(var i=0;i<items.length;i++){
   								 var item=items[i];
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
   						
   						if( args instanceof Array){
   							
   							var items=$(this).find(".v-checkbox-item");
   							for(var i=0;i<items.length;i++){
   								 var item=items[i];
   								for(var y=0;y<args.length;y++){
   									if((i+1)==args[y]){
   										$(item).addClass("active");	
   										break;
   									}
   								}
   								
   							}
   							
   						}else{
   							var arrs = [];
   							$(".v-checkbox-item", this).each(function() {
   								if($(this).hasClass("active")) {
   									var v = $(this).attr("data-val") || "";
   									if(v.trim() != "") {
   										arrs.push(v);
   									}
   								}
   			
   							});
   							
   							return arrs;
   						}
   						
   		}
   	});
   	
   	
   })();
   