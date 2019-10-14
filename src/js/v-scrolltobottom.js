
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
			$(this).trigger("onReachBottom",[this]);
		}
	
	});
	
	// 滚动触发事件
	// $(window).on("onReachBottom",function(e){
	// 	console.log(e.detail)
	// })
	
	
}();
		