
/*
 * hqs  v-input
 *
 * */


+ function () {
    'use strict';

    // define class
    var VInput = function (el,fn) {
        this.el = el;
        this.runing(fn);

    };

   
    VInput.prototype.runing = function (fn) {

        this._event(fn);
    };

    VInput.prototype._event = function (fn) {

        var $this = $(this.el);
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
            var data = $this.data('v-input');
            if (!data) {
              
                $this.data('v-input', data = new VInput(this,fn));
            }
            if (typeof option === 'string') {
                data[option]();
            }

        });
    }

    var _vinput= $.fn.vinput;
    $.fn.vinput = Plugin;



}();