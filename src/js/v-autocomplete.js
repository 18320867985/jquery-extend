
/*
 * hqs  v-autocomplete
 *
 * */

+ function () {
    'use strict';

    // define class
    var VAutocomplete = function (el, fn) {
        this.el = el;
        this.runing(fn);

    };

    VAutocomplete.prototype.runing = function (fn) {

        var self = this;
        var $this = $(this.el);
        var $input = $this.find(".v-autocomplete-input");
        var $menu = $this.find(".v-dropdown-menu");
        this.scrollview = $this.get(0).hasAttribute("data-scrollview");



        $input.on("keydown.v-autocomplete", function (e) {

            if (e.keyCode === 40) {

                self._keydown(e, $input, $menu);
            }

            if (e.keyCode === 38) {

                self._keyup(e, $input, $menu);
            }

            if (e.keyCode === 13) {

                self._keyenter(e, $input, $menu);
            }

        });

        $menu.on("click.v-autocomplete", ">li", function () {

            // not data
            if ($menu.find("._not-item").length > 0) { return; }

            // has data
            $(this).addClass("selected").siblings().removeClass("selected");
            var v = $(this).find(">a").attr("data-val");
            $input.val(v);

        });

        // input change 
        this.input($input, function (event, val) {

            // ie8
            if (window.attachEvent) {
                if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 13) { return; }
            }

            $(this).trigger("v-autocomplete-change", [$input.get(0), val, $menu.get(0)]);

        });

    };

    VAutocomplete.prototype._keyup = function (e, $input, $menu) {

        // not data
        if ($menu.find("._not-item").length > 0) { return; }

        // has data
        var $selected = $menu.find("li.selected");
        var $lis = $menu.find("li");
        var len = $lis.length;
        var index = $selected.index();
        index = index < 0 ? len : index;
        var $sctiveEl = $lis.eq(--index);
        $sctiveEl.addClass("selected").siblings().removeClass("selected");
        var v = $sctiveEl.find(">a").attr("data-val");
        $input.val(v).focus();
        $sctiveEl.trigger("v-autocomplete-select-item", [$sctiveEl.get(0), v]);

        // scrollview
        $menu.get(0).scrollTop = $sctiveEl.get(0).offsetTop - $menu.height() + $sctiveEl.height();
  

    };

    VAutocomplete.prototype._keydown = function (e, $input, $menu) {

        // not data
        if ($menu.find("._not-item").length > 0) { return; }

        // has data
        var $selected = $menu.find("li.selected");
        var $lis = $menu.find("li");
        var len = $lis.length;
        var index = $selected.index();
        index = index >= len - 1 ? -1 : index;
        var $sctiveEl = $lis.eq(++index);
        $sctiveEl.addClass("selected").siblings().removeClass("selected");
        var v = $sctiveEl.find(">a").attr("data-val");
        $input.val(v).focus();
        $sctiveEl.trigger("v-autocomplete-select-item", [$sctiveEl.get(0), v]);

        // scrollview
        $menu.get(0).scrollTop = $sctiveEl.get(0).offsetTop - $menu.height() + $sctiveEl.height();
    
    };

    VAutocomplete.prototype._keyenter = function (e, $input, $menu) {

        var $selected = $menu.find("li.selected");
        var len = $selected.length;
        if (len > 0) {

            var v = $selected.find(">a").attr("data-val");
            $input.val(v).blur();
            $menu.parents(".v-dropdown").vdropdown("hide");

        }

    };

    VAutocomplete.prototype.input = function (el, fn) {

        var $this = $(el);
        if (window.addEventListener) {
            $this.on("input.v-input", function (event) {
                if (typeof fn === "function") {
                    fn.call($this.get(0), event, $this.val());

                }

            });
        } else {
            // ie8
            $this.on("keyup.v-input", function (event) {
                if (typeof fn === "function") {
                    fn.call($this.get(0), event, $this.val());
                }

            });
        }

    };

    function Plugin(fn) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-autocomplete');
            if (!data) {

                $this.data('v-autocomplete', data = new VAutocomplete(this, fn));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vautocomplete = $.fn.vautocomplete;
    $.fn.vautocomplete = Plugin;



}();