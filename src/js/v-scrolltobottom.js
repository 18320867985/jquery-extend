
/*
hqs  v-scrolltobottom 滚动到底部触发事件
*/
+function(){
	
	//  拉到document底部加载
	$(window).scroll(function () {
		var docH = $(document).height();
		var winH = $(window).height();
		var winTop = $(window).scrollTop();
         //  console.log(winTop, docH - winH);
	
        if (winTop < docH - winH){
			return;
		}
		if(winTop>=docH-winH){
            $(this).trigger("onWindowReachBottom", [this]);  
		}
	
	});
	
	

    // 元素scroll扩展函数
    $.fn.extend({
        VReachBottom: function () {

            var els = $(this);
            els.each(function () {
                var el = this;
				var elH = el.clientHeight;
				var srlH = el.scrollHeight;
				var srlTop = el.scrollTop;
				
               
            });

        }
    });
}();
		