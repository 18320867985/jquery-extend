	/*
		  
	 <div class="v-number" >
	    <button class="minus btn" type="button">-</button>
		<input class="num" type="number" value="1" data-min="0" data-max="9999" data-step="1" />
		<button class="plus btn" type="button">+</button>
		  
	</div>
	 
		 * 数字框组件start
		 * 事件：v-number
		 *
		 * 点击事件
			$(document).on("v-number",function(event,element){			
				//element 当前点击的元素	
				var p=$(element).parents(".v-number");
				alert($(p).find(".num").val());
									
			});
			
			//	$(".v-number").VNumber("8");
			// get
			//var v=$(".v-number").VNumber();
		 * */

	(function() {

		//minus
		$(document).on("click", ".minus", function(e) {

			e.stopPropagation();
			e.preventDefault();

			var p = $(this).parents(".v-number");

			//步长
			var step = Number($(".num", p).attr("data-step"));
			step = window.isNaN(step) ? 1 : step;

			//最大值
			//			var max=Number($(".num",p).attr("data-max"));
			//				max=window.isNaN(max)?9999:max;
			//最小值
			var min = Number($(".num", p).attr("data-min"));
			min = window.isNaN(min) ? 0 : min;

			var v = Number($(".num", p).val());
			v = window.isNaN(v) ? min : v;

			//计算
			v = v > min ? v - step : min;

			if(v <= min) {
				v = min;
			}

			$(".num", p).val(v);

			//点击触发自定义事件
            $(this).trigger("v-number", [v, p.get(0)]);

		});

		//plus
		$(document).on("click", ".plus", function(e) {
			e.stopPropagation();
			e.preventDefault();
			var p = $(this).parents(".v-number");

			//步长
			var step = Number($(".num", p).attr("data-step"));
			step = window.isNaN(step) ? 1 : step;

			//最大值
			var max = Number($(".num", p).attr("data-max"));
			max = window.isNaN(max) ? 9999 : max;
			//最小值
			var min = Number($(".num", p).attr("data-min"));
			min = window.isNaN(min) ? 0 : min;

			var v = Number($(".num", p).val());
			v = window.isNaN(v) ? min : v;

			//计算
			v = v < max ? v + step : max;

			if(v >= max) {
				v = max;
			}

			$(".num", p).val(v);
			//点击触发自定义事件
            $(this).trigger("v-number", [v, p.get(0)]);

		});

		// value
        $(document).on("blur", ".num", function(e) {
			var p = $(this).parents(".v-number");
			//最大值
			var max = Number($(".num", p).attr("data-max"));
			max = window.isNaN(max) ? 9999 : max;
			//最小值
			var min = Number($(".num", p).attr("data-min"));
			min = window.isNaN(min) ? 0 : min;

			var v = Number($(".num", p).val());
			v = window.isNaN(v) ? min : v;

			if(v > max) {
				v = max;
			}

			if(v < min) {
				v = min;
			}

			$(".num", p).val(v);
			//点击触发自定义事件
			$(this).trigger("v-number", [v,p.get(0)]);

		});

	$.fn.extend({

			VNumber: function(v) {
            var $el = $(this).find(".num");
            if (arguments.length >= 1) {
               
                var min = parseFloat(  $el.attr("data-min") || 0);
                var max = parseFloat( $el.attr("data-max") || 9999);

                    if (isNaN(v)) {
                        v = min;
                    }
                    else {
                        v = parseFloat(v);
                        v = v < min ? min : v;
                        v = v >max ? max : v;
                }

                $el.val(v);

                //点击触发自定义事件
                $(this).trigger("v-number", [v, $(this).get(0)]);

            } else if (arguments.length===0) {
                    return $el.val();
				}
			}

		});

	})();
	
