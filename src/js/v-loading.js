/**
 * hqs  v-vloading
 * 
 * type 
 * 1.ball 
 * 2.window

**/

+ function () {
    'use strict';

    // define class
    var VLoading = function (el, options, props) {
        this.el = el;
        this.options = options;
        this.props = props instanceof Object ? props : {};   // { icon :"ball",type:"dark",text:"loading"}


    };

    VLoading.DEFAULTS = {

    };

    VLoading.prototype.isBody = function () {
        if (this.el === window || this.el === document || this.el.nodeName === "HTML" || this.el.nodeName === "BODY") {
            return true;
        }
        return false;
    };

    VLoading.prototype.deleleElement = function () {
        $(this.el).find(".v-loading-cnt").remove();

    };

    VLoading.prototype.show = function (props) {

        this.deleleElement();
        this.props = props instanceof Object ? props : {};   // { icon :"ball",type:"dark",text:"loading"}

        var loadingBox = document.createElement("div");
        var bg = document.createElement("div");
        bg.setAttribute("class", "v-loading-cnt-bg");
        if (this.props.type === "dark") {
            bg.setAttribute("class", "v-loading-cnt-bg v-loading-dark");
        }
        loadingBox.appendChild(bg);

        // mask
        var bgie8 = document.createElement("div");
        bgie8.setAttribute("class", "v-loading-cnt-bgie8");
        if (this.props.type === "dark") {
            bgie8.setAttribute("class", "v-loading-cnt-bgie8 v-loading-dark");
        }
        loadingBox.appendChild(bgie8);

        // icon
        if (window.addEventListener) {
            if (this.props.icon === "ball") {
                var rotate = document.createElement("div");
                rotate.setAttribute("class", "v-loading-icon v-loading-ball");
                loadingBox.appendChild(rotate);
            }

            else if (this.props.icon === "window") {
                var square = document.createElement("div");
                square.setAttribute("class", "v-loading-icon v-loading-window");
                loadingBox.appendChild(square);
            }

        }

        // text
        var span = document.createElement("span");
        span.setAttribute("class", "v-loading-txt");
        span.innerHTML = this.props.text ? this.props.text : "正在加载...";
        loadingBox.appendChild(span);


        // type
        if (this.isBody()) {
            loadingBox.setAttribute("class", "v-loading-cnt v-fixed ");
            if (this.props.type === "dark") {
                loadingBox.setAttribute("class", "v-loading-cnt v-fixed v-loading-dark");
            }
            $("html").addClass("v-loading-pwr").append(loadingBox).addClass("html-v-loading");
        } else {

            loadingBox.setAttribute("class", "v-loading-cnt ");
            if (this.props.type === "dark") {
                loadingBox.setAttribute("class", "v-loading-cnt v-loading-dark");
            }
            $(this.el).addClass("v-loading-pwr").append(loadingBox);
        }

   


    };

    VLoading.prototype.hide = function () {

        var bg = document.createElement("div");
        bg.setAttribute("class", "v-loading-cnt-bg");

        if (this.isBody()) {
            $("html >.v-loading-cnt").remove();
            $("html").removeClass("html-v-loading");
        } else {
            $(this.el).find(".v-loading-cnt").remove();
        }
       


    };

    VLoading.prototype.fail = function (props,fn) {
            //  删除fail的事件
        $(document).off("click", ".v-loading-cnt-fail-reload");
         props = props instanceof Object ? props : {};
        var failEl = document.createElement("div");
        failEl.setAttribute("class", "v-loading-cnt-fail");

        var failEl_ttl = document.createElement("div");
        failEl_ttl.setAttribute("class", "v-loading-cnt-fail-ttl");
        failEl_ttl.innerHTML = props.errttl ? props.errttl : "~数据加载失败了~";
        if ($.trim(props.direction) === "tb") {
            failEl_ttl.setAttribute("class", "v-loading-cnt-fail-ttl v-loading-fail-tb ");
        }
        failEl.appendChild(failEl_ttl);

        var failEl_reload = document.createElement("div");
        failEl_reload.setAttribute("class", "v-loading-cnt-fail-reload");
        
        failEl_reload.innerHTML = props.reload ? props.reload : "重新加载";
        failEl.appendChild(failEl_reload);

        if (this.isBody()) {
            $("html >.v-loading-cnt>.v-loading-icon").remove();
            $("html >.v-loading-cnt>.v-loading-txt").remove();
            $("html >.v-loading-cnt").append(failEl);
        } else {
            $(this.el).find(".v-loading-icon").remove();
            $(this.el).find(".v-loading-txt").remove();
            $(this.el).find(".v-loading-cnt").append(failEl);
        }
        
        $(document).on("click", ".v-loading-cnt-fail-reload", function (e) {

            if (typeof fn === "function") {
                fn(e);
            }
        });
    };

    function Plugin(option, props,callback) {

        return this.each(function () {

            var $this = $(this);
            var data = $this.data('v-loading');

            var options = typeof option === 'object' && option;
            if (!data) {

                var p = $.extend({}, VLoading.DEFAULTS, options);
                $this.data('v-loading', data = new VLoading(this, p, props));

            }
            if (typeof option === 'string') {
                data[option](props,callback);
            }

        });
    }

    var _vloading = $.fn.vloading;
    $.fn.vloading = Plugin;

}();