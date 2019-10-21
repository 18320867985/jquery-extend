/**
 * hqs  v-vloading

**/

+ function() {
    'use strict';

    // define class
	var VLoading = function(el,options) {
		this.el=el;
        this.options = options;
		this.runing();
	};

	VLoading.DEFAULTS = {
		
	};

	VLoading.prototype.runing = function() {

	};
	
    VLoading.prototype.show = function () {
     
        var loadingBox = document.createElement("div");
        var span = document.createElement("span");
        span.innerHTML = "ÕýÔÚ¼ÓÔØ...";
        loadingBox.appendChild(span);
        $(this.el).append(loadingBox);
	
	};
	
	VLoading.prototype.hide = function() {
	
	};

	function Plugin(option) {

		return this.each(function() {

			var $this = $(this);
			var data = $this.data('v-loading');
			var options = typeof option === 'object' && option;

			if (!data) {

				var o = {};
				var p = $.extend({}, VLoading.DEFAULTS, o, options);
				$this.data('v-loading', data = new VLoading(this,p));

			}
			if (typeof option === 'string') {
				data[option]();
			}

		});
	}

    var _vloading = $.fn.vloading;
	$.fn.vloading = Plugin;

}();
