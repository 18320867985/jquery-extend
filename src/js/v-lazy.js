/**
 * hqs  lazy.js

**/

+ function() {

	var VLazy = function(el, options) {

		this.el = el;
		this.oldsrc = "";
		this.options = options;
		this.running();

	};

	VLazy.DEFAULTS = {
		timing: 400
	};

	VLazy.prototype.show = function(url) {

		var $this = $(this.el);
		var src = $this.attr("data-lazy") || "";
		src = typeof url === "string" ? url : src;
		if (src) {
			$this.attr("src", src);
		}

	};

	VLazy.prototype.reset = function(url) {

		var src = this.oldsrc || "";
		if (this.oldsrc) {
			$(this.el).attr("src", src);
		}

	};

	VLazy.prototype.scroll = function() {


		if (this.el === window || this.el === document) {

			$(window).on("scroll.v-lazy", $.proxy(this._scrollImg, this));

		} else if (this.el.nodeType === 1) {
			$(this.el).css("position", "relative");
			$(this.el).on("scroll.v-lazy", $.proxy(this._scrollImgByElement, this));
		}

	};

	VLazy.prototype._scrollImg = function() {

		var $list = $(document).find(".v-lazy-img");
		var window_h = $(window).height();
		var len = $list.length;
		if (len === 0) {
			return;
		}
		$list.each(function() {
			var $this = $(this);
			var img_h_min = parseInt($this.offset().top) - parseInt(window_h);
			var img_h_max = parseInt($this.offset().top) + $this.height();
			var _srltop = $(window).scrollTop();
			if (_srltop >= img_h_min && _srltop < img_h_max) {

				if (!$this.data("bl")) {
					$this.data("bl", true);
					var _src = $this.attr("data-lazy") || "";
					$this.attr("src", _src);
					$this.removeClass("v-lazy-img");
					$this.on("load.v-lazy", function() {
						$this.css("opacity", 0).stop().animate({
							opacity: 1
						}, VLazy.DEFAULTS.timing);
					});
				}
			}

		});

	};

	VLazy.prototype._scrollImgByElement = function() {

		var $el = $(this.el);
		var $list = $el.find(".v-lazy-img");
		var el_h = $el.outerHeight();
		var len = $list.length;

		if (len === 0) {
			return;
		}
		$list.each(function() {
			var $this = $(this);
			var img_h_min = parseInt(this.offsetTop) - parseInt(el_h);
			var img_h_max = parseInt(this.offsetTop) + $this.height();
			var _srltop = $el.scrollTop();
			if (_srltop >= img_h_min && _srltop < img_h_max) {

				if (!$this.data("bl")) {
					$this.data("bl", true);
					var _src = $this.attr("data-lazy") || "";
					$this.attr("src", _src);
					$this.removeClass("v-lazy-img");
					$this.on("load.v-lazy", function() {
						$this.css("opacity", 0).stop().animate({
							opacity: 1
						}, VLazy.DEFAULTS.timing);
					});
				}
			}

		});

	};

	VLazy.prototype.init = function() {

		if (this.el === window || this.el === document) {
			this._scrollImg();

		} else if (this.el.nodeType === 1) {
			var $el = $(this.el);
			var $list = $el.find(".v-lazy-img");
			var len = $list.length;
			if (len === 0) {
				return;
			}
			var el_h = $el.outerHeight();
			$list.each(function() {
				var elOffsetTop = this.offsetTop;
				if (elOffsetTop >=0 && elOffsetTop < el_h) {
					var $this = $(this);
					if (!$this.data("bl")) {
						$this.data("bl", true);
						var _src = $this.attr("data-lazy") || "";
						$this.attr("src", _src);
						$this.removeClass("v-lazy-img");
						$this.on("load.v-lazy", function() {
							$this.css("opacity", 0).stop().animate({
								opacity: 1
							}, VLazy.DEFAULTS.timing);

						});
					}
				}
			});
		}

	};

	VLazy.prototype.running = function() {

		if (this.el.nodeName === "IMG") {
			var $this = $(this.el);
			var src = $this.attr("src") || "";
			this.oldsrc = src;
			$this.on("load.v-lazy", function(e) {
				$this.css("opacity", 0).stop().animate({
					opacity: 1
				}, VLazy.DEFAULTS.timing);
			});
		}
	};

	VLazy.prototype.scrollemit = function() {

		if (this.el === window || this.el === document) {

			$(window).on("scroll.v-lazy", $.proxy(this._scrollemit, this));

		}
	};

	VLazy.prototype._scrollemit = function() {

		var $el = $(this.el);
		var $list = $el.find(".v-lazy-emit");
		var window_h = $(window).height();
		var len = $list.length;

		if (len === 0) {
			return;
		}
		$list.each(function() {
			var $this = $(this);
			var img_h_min = parseInt($this.offset().top) - parseInt(window_h);
			var img_h_max = parseInt($this.offset().top) + $this.height();
			var _srltop = $(window).scrollTop();
			if (_srltop >= img_h_min && _srltop < img_h_max) {

				if (!$this.data("bl")) {
					$this.data("bl", true);
					$this.removeClass("v-lazy-emit");
					$this.trigger("v-lazy-scrollemit", [this]);

				}
			}

		});

	};

	function Plugin(option, url) {

		return this.each(function() {

			var $this = $(this);
			var data = $this.data('v-lazy');
			var options = typeof option === 'object' && option;

			if (!data) {

				var p = $.extend({}, VLazy.DEFAULTS, options);

				$this.data('v-lazy', data = new VLazy(this, p));

			}
			if (typeof option === 'string') {

				data[option](url);
			}

		});
	}

	$(window).on("load.v-lazy", function() {
		$("[data-toggle=v-lazy]").each(function() {
			var $this = $(this);
			var src = $this.attr("data-lazy") || "";
			if (src) {
				Plugin.call($this, "show");
			}

		});
	});

	var _vlazy = $.fn.vlazy;
	$.fn.vlazy = Plugin;


}();
