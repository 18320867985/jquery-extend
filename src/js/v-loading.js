/**
 * hqs  v-vloading
 * 
 * type 
 * 1.ball 
 * 2.window

**/

+ function() {
    'use strict';

    // define class
	var VLoading = function(el,options,type,dark) {
        this.el = el;
        this.type = $.trim(type);
        this.options = options;
        this.dark = dark;

	};

	VLoading.DEFAULTS = {
		
    };

    VLoading.prototype.isBody = function () {
        if (this.el === window || this.el === document || this.el.nodeName === "HTML" || this.el.nodeName === "BODY") {
            return true;
        }
        return false;
    };

    VLoading.prototype.deleleElement = function () {
        $(this.el).find(".v-loading-cnt").remove();
       
	};
	
    VLoading.prototype.show = function () {
        this.deleleElement();

        var loadingBox = document.createElement("div");
       

        var bg = document.createElement("div");
        bg.setAttribute("class", "v-loading-cnt-bg");
        if (this.dark === "dark") {
            bg.setAttribute("class", "v-loading-cnt-bg v-loading-dark");
        }
        loadingBox.appendChild(bg);

        var bgie8 = document.createElement("div");
        bgie8.setAttribute("class", "v-loading-cnt-bgie8");
        if (this.dark === "dark") {
            bgie8.setAttribute("class", "v-loading-cnt-bgie8 v-loading-dark");
        }
        loadingBox.appendChild(bgie8);

        // icon-1-ie9
        if (window.addEventListener) {
            if (this.type === "ball") {
                var rotate = document.createElement("div");
                rotate.setAttribute("class", "v-loading-ball");
                loadingBox.appendChild(rotate);
            }

            else if (this.type === "window") {
                var square = document.createElement("div");
                square.setAttribute("class", "v-loading-window");
                loadingBox.appendChild(square);
            }

        }

        var span = document.createElement("span");
        span.setAttribute("class", "v-loading-txt");
        span.innerHTML = "正在加载...";
        loadingBox.appendChild(span);

        if (this.isBody()) {
            loadingBox.setAttribute("class", "v-loading-cnt v-fixed ");
            if (this.dark === "dark") {
                loadingBox.setAttribute("class", "v-loading-cnt  v-fixed   v-loading-dark");
            }
            $("html").addClass("v-loading-pwr").append(loadingBox).addClass("html-v-loading");
        } else {
            
            loadingBox.setAttribute("class", "v-loading-cnt ");
            if (this.dark === "dark") {
                loadingBox.setAttribute("class", "v-loading-cnt  v-loading-dark");
            }
            $(this.el).addClass("v-loading-pwr").append(loadingBox);
        }
       
       
    };

    VLoading.prototype.hide = function () {


        $(this.el).find(".v-loading-cnt").remove();
        $("html").removeClass("html-v-loading");

    };
	

	function Plugin(option,type,dark) {

		return this.each(function() {

			var $this = $(this);
			var data = $this.data('v-loading');
			var options = typeof option === 'object' && option;

			if (!data) {

				var o = {};
				var p = $.extend({}, VLoading.DEFAULTS, o, options);
                $this.data('v-loading', data = new VLoading(this, p, type, dark));

			}
			if (typeof option === 'string') {
				data[option]();
			}

		});
	}

    var _vloading = $.fn.vloading;
	$.fn.vloading = Plugin;

}();
