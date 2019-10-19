/**
 * hqs  v-vloading

**/

+ function() {
    'use strict';

    // define class
	var VLoading = function(options) {
        this.obj = options;
		this.runing();
	};

	VLoading.DEFAULTS = {
		offsetTop: 0
	};

	VLoading.prototype.runing = function() {

	};

	function Plugin(option) {

		return this.each(function() {

			var $this = $(this);
			var data = $this.data('v-loading');
			var options = typeof option === 'object' && option;

			if (!data) {

				var o = {};
				
				var p = $.extend({}, VLoading.DEFAULTS, o, options);
				$this.data('v-loading', data = new VLoading(p));

			}
			if (typeof option === 'string') {
				data[option]();
			}

		});
	}

    var _vloading = $.fn.vloading;
	$.fn.vloading = Plugin;

}();
