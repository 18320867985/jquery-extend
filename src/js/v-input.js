

/* v-input */

+function () {

    var Plugin = function (fn) {

        var $this = $(this);
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

    var _vinput = $.fn.vinput;
    $.fn.vinput = Plugin;


  



}();
