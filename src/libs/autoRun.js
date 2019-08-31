/*自动执行 rollup打包umd格式js模块
	 
	 * <script   data-parent="umd" data-umd="test" src="./js/all.js" type="text/javascript" charset="utf-8"></script>
	 * */

(function () {

    function trim(txt) {
        var str = "";
        txt = typeof txt === "string" ? txt : "";
        str = txt.replace(/^\s*|\s*$/img, "");
        return str;
    }

    if (window.addEventListener) {
         // support ie9+
        window.addEventListener("load", function () {
            init();
        });
      
    } else {
        // support ie8
        window.attachEvent("onload", function () {
            init();
        });
    }


    function init() {
        var el_umds = document.querySelectorAll("script[data-umd]");
        for (var i = 0; i < el_umds.length; i++) {

            var parent = "umd";
            var el_umd = el_umds[i];
            if (el_umd) {

                parent = el_umd.getAttribute("data-parent") || parent;
                var umd_str = el_umd.getAttribute("data-umd") || "";
                var umd_strs = umd_str.split(/,|;|&/);
                for (var i2 = 0; i2 < umd_strs.length; i2++) {
                    var item = umd_strs[i2] || "";
                    if (trim(item) !== "") {
                        setUmd(parent, trim(item));
                    }
                }

            }
        }
    }


		function setUmd(parent,umd_str) {

			var arrs = umd_str.split(".");
			var prop1 = "";
			var prop2 = "";
			if (arrs.length >= 0) {
				prop1 = arrs[0]||"";
                prop1 = trim(prop1);
			}

			if (arrs.length === 1) {
				prop2 = "init";
			} else if (arrs.length === 2) {
                prop2 = trim(arrs[1]);

			}

			var obj = window[parent];
			if (!obj) {
				return;
			}
			if (!obj[prop1]) {
				return;
			}
			var fn = obj[prop1][prop2];

			if (typeof fn === "function") {
				fn();
			}

		}


    }) ();
