
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

        var $this = $(this.el);
        var $input = $this.find(".v-autocomplete-input");
        var $menu = $this.find(".v-dropdown-menu");

        $input.on("keyup", function (e) {

            if (e.keyCode === 40) {
                var $selected = $menu.find("li.selected");
                var $lis= $menu.find("li");
                var len = $lis.length;
                var index = $selected.index();
                console.log(len)
                index = index >= len-1 ? -1 : index;
                index = index + 1;
                var $sctiveEl = $lis.eq(index);
                $sctiveEl.addClass("selected").siblings().removeClass("selected");
                var v = $sctiveEl.find("a").attr("data-val");
                $input.val(v).focus();

                console.log(index)


            }

        });


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