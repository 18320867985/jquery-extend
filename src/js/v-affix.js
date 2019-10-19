/**
 * hqs  v-vaffix

**/

+ function() {
    'use strict';

    // define class
	var VAffix = function(options) {
        this.obj = options;
		this.runing();
	};

	VAffix.DEFAULTS = {
		offsetTop: 0
	};

	VAffix.prototype.runing = function() {

		var o = this.obj;
        $(window).on("scroll.v-vaffix", function() {
			var $this = o.el;
			var win_srl_top = $(window).scrollTop();
			var _top = o.top - o.offsetTop;

			if (win_srl_top > _top) {
		
				$this.addClass("v-affix");
				if (o.hasOwnProperty("offsetBottom")) {
					$this.css("bottom", o.offsetBottom + "px");
				} else {
					$this.css("top", o.offsetTop + "px");
				}

			} else {
				$this.removeClass("v-affix").css({
					"top": "auto",
					"bottom": "auto"
				});
			}

		});

	};

	function Plugin(option) {

		return this.each(function() {

			var $this = $(this);
			var data = $this.data('v-affix');
			var options = typeof option === 'object' && option;

			if (!data) {

				var o = {};
				o.el = $this;
				o.positionTop = parseFloat($this.css("top")) || 0;
				o.top = parseFloat($this.offset().top);
				o.offsetTop = parseFloat($this.attr("data-offset-top")) || 0;
				if (this.hasAttribute("data-offset-bottom")) {
					o.offsetBottom = parseFloat($this.attr("data-offset-bottom")) || 0;
				}

				var p = $.extend({}, VAffix.DEFAULTS, o, options);
				$this.data('v-affix', data = new VAffix(p));

			}
			if (typeof option === 'string') {
				data[option]();
			}

		});
	}

    var _vaffix = $.fn.vaffix;
	$.fn.vaffix = Plugin;

	// html model each
	$("[data-spy='v-affix']").each(function() {

		var $this = $(this);
		Plugin.call($this);

	});


}();
