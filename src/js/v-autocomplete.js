
/*
 * hqs  v-input
 *
 * */

+ function () {
    'use strict';

    // define class
    var VAutocomplete = function (el,fn) {
        this.el = el;
        this.runing(fn);

    };

    VAutocomplete.prototype.runing = function (fn) {

        var self = this;
        var $this = $(this.el);
        var $input = $this.find(".v-autocomplete-input");
        var $menu = $this.find(".v-dropdown-menu");

        $input.on("keydown.v-autocomplete", function (e) {
            
            if (e.keyCode === 40) {
              
                self._keydown($input,$menu);
            }

            if (e.keyCode === 38) {

                self._keyup($input, $menu);
            }

            if (e.keyCode === 13) {
               
                self._keyenter($input, $menu);
            }

        });

        $menu.on("click.v-autocomplete", ">li", function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            var v = $(this).find(">a").attr("data-val");
            $input.val(v);

        });

        // input change 
        $input.vinput(function (event, val) {

            // ie8
            if (window.attachEvent) {
                if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 13) { return; }
            }
           
            $(this).trigger("v-autocomplete-change", [$input.get(0), val, $menu.get(0)]);
            
        });

    };

    VAutocomplete.prototype._keyup = function ($input, $menu) {

        var $selected = $menu.find("li.selected");
        var $lis = $menu.find("li");
        var len = $lis.length;
        var index = $selected.index();
        index = index <0 ? len : index;
        var $sctiveEl = $lis.eq(--index);
        $sctiveEl.addClass("selected").siblings().removeClass("selected");
        var v = $sctiveEl.find(">a").attr("data-val");
        $input.val(v).focus();
        $sctiveEl.trigger("v-autocomplete-select-item", [$sctiveEl.get(0),v]);

    };

    VAutocomplete.prototype._keydown = function ($input, $menu) {

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

    };

    VAutocomplete.prototype._keyenter = function ($input, $menu) {

        var $selected = $menu.find("li.selected");
        var len = $selected.length;
        if (len > 0) {
            
            var v = $selected.find(">a").attr("data-val");
            $input.val(v).blur();
            $menu.parents(".v-dropdown").vdropdown("hide");
           
        }

    };
    

    function Plugin(fn) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-autocomplete');
            if (!data) {
              
                $this.data('v-autocomplete', data = new VAutocomplete(this,fn));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vautocomplete = $.fn.vautocomplete;
    $.fn.vautocomplete = Plugin;



}();