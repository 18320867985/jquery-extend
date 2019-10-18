
/*
hqs  v-scrolltobottom 滚动到底部触发事件
*/
+function(){
    'use strict';

	//  拉到document底部加载-事件模式
	$(window).scroll(function () {
		var docH = $(document).height();
		var winH = $(window).height();
		var winTop = $(window).scrollTop();
        
        if (winTop < docH - winH){
			return;
		}
		if(winTop>=docH-winH){
            $(this).trigger("onreachbottom", [this]);  
		}
	
	});

    // define class
    function VReachBottom(el,fn) {
        this.el = el;
        this.runing(fn);
    }
  

    VReachBottom.DEFAULTS = {
       
    };

    VReachBottom.prototype.runing = function (fn) {

        var el = this.el;
   
        // window
        if (el === window) {
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

            return;
        }

        // document
        $(el).scroll(function (e) {
            var _el = e.target;
            var elH = _el.clientHeight;
            var srlH = _el.scrollHeight;
            var srlTop = _el.scrollTop;

            // 滚动的高度小于元素大框高度
            if (srlH < elH) {
                return;
            }

            // 滚动的真实高度
            var _top = srlH - elH;

            if (srlTop >= _top) {

                if (typeof fn === "function") {
                    fn(e, this);
                }
            }
        });
   

    };

  
    function Plugin(option) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-reachbottom');
            if (!data) {

                $this.data('v-reachbottom', data = new VReachBottom(this, option));

            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vreachbottom = $.fn.vreachbottom;
    $.fn.vreachbottom = Plugin;

	
}();
		