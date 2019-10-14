
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
            $(this).trigger("onReachBottom", [this]);  
		}
	
	});
	
	
    // 元素scroll扩展函数
    $.fn.extend({
        VReachBottom: function (fn) {
			
            var els = $(this);
			
			// window
			if(els.get(0)===window){
				
				$(window).scroll(function (e) {
					var docH = $(document).height();
					var winH = $(window).height();
					var winTop = $(window).scrollTop();
                   
                    //滚动的高度小于元素大框高度
                    if (docH < winH) {
						return;
                    }

                    var _top = docH - winH;
                    if (winTop >= _top) {
                        if (typeof fn === "function") {
                            fn(e, window);
                        }
					}
				
				});
			}
			
			// document
            els.each(function () {
				
				$(this).scroll(function(e){
					var  el=e.target;
					var elH = el.clientHeight;
					var srlH = el.scrollHeight;
					var srlTop = el.scrollTop;
					
					// 滚动的高度小于元素大框高度
					if (srlH <elH){
						return;
					}
					
					// 滚动的真实高度
					var _top=srlH-elH;
					
                    if (srlTop >= _top) {
                        
						if(typeof fn ==="function"){
							fn(e,this);
						}
					}
				});	     
            });

        }
    });
}();
		