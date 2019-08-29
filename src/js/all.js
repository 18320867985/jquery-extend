(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/*  hqs */

(function () {

        //  confirm
        jQuery.fn.extend({

                confirm: _confirm

        });
        jQuery.extend({

                confirm: _confirm

        });

        //  confirm
        function _confirm(tipText, mess, okfun, cancelfun, obj) {
                if (!arguments.length >= 2) {

                        throw new Error("property is must two");
                }

                obj = obj || {};
                var _okText = obj.ok || "确认";
                var _cancelText = obj.cancel || "取消";

                mess = mess || "此操作将永久删除该文件, 是否继续?";
                $(".message").remove();

                var message = document.createElement("div");
                message.setAttribute("class", "message");
                var message_mask = document.createElement("div");
                message_mask.setAttribute("class", "message-mask");
                var message_box = document.createElement("div");
                message_box.setAttribute("class", "confirm-box");

                // 创建message
                if (tipText !== null) {
                        tipText = tipText || "提示";
                        var tip = document.createElement("div");
                        tip.setAttribute("class", "tip");
                        tip.innerText = tipText;
                        message_box.appendChild(tip);
                }

                var ttl = document.createElement("h4");
                ttl.setAttribute("class", "ttl");
                ttl.innerText = mess;

                var close = document.createElement("div");
                close.setAttribute("class", "_close");
                close.innerHTML = "&times;";
                message_box.appendChild(close);

                var ok_btn = document.createElement("button");
                ok_btn.setAttribute("type", "button");
                ok_btn.setAttribute("class", "ok confirm-btn");
                ok_btn.innerText = _okText;

                var cancel_btn = document.createElement("button");
                cancel_btn.setAttribute("type", "button");
                cancel_btn.setAttribute("class", "cancel confirm-btn");
                cancel_btn.innerText = _cancelText;

                message_box.appendChild(ttl);
                message_box.appendChild(ok_btn);
                message_box.appendChild(cancel_btn);
                message.appendChild(message_mask);
                message.appendChild(message_box);

                var elm = document.body || document.documentElement;
                elm.appendChild(message);

                $(".message").stop().fadeIn();
                $(".confirm-btn.ok").focus();
                $(".message").on("click", ".confirm-btn.ok", function (e) {

                        if (typeof okfun === "function") {
                                $(".message").remove();
                                okfun.call(this);
                        }
                });

                $(".message").on("click", ".confirm-btn.cancel", function (e) {

                        if (typeof cancelfun === "function") {

                                cancelfun.call(this);
                        }
                        $(".message").remove();
                });

                $(".message").on("click", "._close", function (e) {

                        $(".message").remove();
                });
        }

        // prompt
        jQuery.fn.extend({

                prompt: _prompt

        });
        jQuery.extend({

                prompt: _prompt

        });

        //  prompt
        function _prompt(tipText, mess, okfun, cancelfun, pwd) {
                if (!arguments.length >= 2) {

                        throw new Error("property is must two");
                }

                var obj = {};
                var _okText = obj.ok || "确认";
                var _cancelText = obj.cancel || "取消";

                mess = mess || "此操作将永久删除该文件, 是否继续?";
                $(".message").remove();

                var message = document.createElement("div");
                message.setAttribute("class", "message");
                var message_mask = document.createElement("div");
                message_mask.setAttribute("class", "message-mask");
                var message_box = document.createElement("div");
                message_box.setAttribute("class", "confirm-box");

                // 创建message
                if (tipText !== null) {
                        tipText = tipText || "提示";
                        var tip = document.createElement("div");
                        tip.setAttribute("class", "tip");
                        tip.innerHTML = tipText;
                        message_box.appendChild(tip);
                }

                var ttl = document.createElement("h4");
                ttl.setAttribute("class", "ttl");
                ttl.innerText = mess;

                var close = document.createElement("div");
                close.setAttribute("class", "_close");
                close.innerHTML = "&times;";
                message_box.appendChild(close);

                var input = document.createElement("input");
                input.setAttribute("class", "txt");
                if (pwd) {
                        input.setAttribute("type", "password");
                } else {
                        input.setAttribute("type", "text");
                }

                var err = document.createElement("p");
                err.setAttribute("class", "err");

                var ok_btn = document.createElement("button");
                ok_btn.setAttribute("type", "button");
                ok_btn.setAttribute("class", "ok confirm-btn");
                ok_btn.innerText = _okText;

                var cancel_btn = document.createElement("button");
                cancel_btn.setAttribute("type", "button");
                cancel_btn.setAttribute("class", "cancel confirm-btn");
                cancel_btn.innerText = _cancelText;

                message_box.appendChild(ttl);
                message_box.appendChild(input);
                message_box.appendChild(err);
                message_box.appendChild(ok_btn);
                message_box.appendChild(cancel_btn);
                message.appendChild(message_mask);
                message.appendChild(message_box);

                var elm = document.body || document.documentElement;
                elm.appendChild(message);

                $(".message").stop().fadeIn();
                $(".message .txt").focus();
                $(".message").on("click", ".confirm-btn.ok", function (e) {

                        if (typeof okfun === "function") {

                                var p = $(this).parents(".message");
                                var v = $(".txt", p).val();
                                if (okfun.call(this, v, $("p.err", p))) {
                                        $(".message").remove();
                                }
                        }
                });

                $(".message").on("click", ".confirm-btn.cancel", function (e) {

                        if (typeof cancelfun === "function") {

                                cancelfun.call(this);
                        }
                        $(".message").remove();
                });

                $(".message").on("click", "._close", function (e) {

                        $(".message").remove();
                });
        }

        //  alert
        jQuery.fn.extend({

                alert: _alert
        });

        //  alert
        jQuery.extend({

                alert: _alert
        });

        //  alert
        function _alert(tipText, mess, okfun, obj) {
                if (!arguments.length >= 2) {

                        throw new Error("property is must two");
                }

                obj = obj || {};
                var _okText = obj.ok || "确定";

                mess = mess || "这是提示信息";
                $(".message").remove();

                var message = document.createElement("div");
                message.setAttribute("class", "message");
                var message_mask = document.createElement("div");
                message_mask.setAttribute("class", "message-mask");
                var message_box = document.createElement("div");
                message_box.setAttribute("class", "confirm-box");

                // 创建message
                if (tipText !== null) {

                        tipText = tipText || "提示";
                        var tip = document.createElement("div");
                        tip.setAttribute("class", "tip");
                        tip.innerText = tipText;
                        message_box.appendChild(tip);
                }

                var ttl = document.createElement("h4");
                ttl.setAttribute("class", "ttl");
                ttl.innerText = mess;

                var close = document.createElement("div");
                close.setAttribute("class", "_close");
                close.innerHTML = "&times;";
                message_box.appendChild(close);

                var ok_btn = document.createElement("button");
                ok_btn.setAttribute("type", "button");
                ok_btn.setAttribute("class", "ok confirm-btn");
                ok_btn.innerText = _okText;

                message_box.appendChild(ttl);
                message_box.appendChild(ok_btn);
                message.appendChild(message_mask);
                message.appendChild(message_box);

                var elm = document.body || document.documentElement;
                elm.appendChild(message);

                $(".message").stop().fadeIn();
                $(".confirm-btn.ok").focus();
                $(".message").on("click", ".confirm-btn.ok", function (e) {
                        $(".message").remove();
                        if (typeof okfun === "function") {
                                okfun.call(this);
                        }
                });
                $(".message").on("click", "._close", function (e) {

                        $(".message").remove();
                });
        }

        //  info
        jQuery.fn.extend({
                info: _info
        });

        //  info
        jQuery.extend({
                info: _info
        });

        var setTimeoutId_info = 0;
        function _info(mess, type) {

                mess = mess || "信息提示框";
                $(".messageinfo").remove();
                var _class = "default";
                if (typeof type === "string") {
                        switch (type) {
                                case "default":
                                        _class = "default";
                                        break;
                                case "info":
                                        _class = "info";
                                        break;
                                case "success":
                                        _class = "success";
                                        break;
                                case "warning":
                                        _class = "warning";
                                        break;
                                case "danger":
                                        _class = "danger";
                                        break;
                                default:
                                        _class = "default";
                        }
                }

                // 创建message
                var message = document.createElement("div");
                message.setAttribute("class", "messageinfo");

                var message_box = document.createElement("div");
                message_box.setAttribute("class", "info-box");

                var ttl = document.createElement("h4");
                ttl.setAttribute("class", "ttl " + _class);
                ttl.innerText = mess;

                var bg = document.createElement("div");
                bg.setAttribute("class", "_bg");
                ttl.appendChild(bg);

                message_box.appendChild(ttl);
                message.appendChild(message_box);

                var elm = document.body || document.documentElement;
                elm.appendChild(message);

                $(".messageinfo").fadeIn(600);
                clearTimeout(setTimeoutId_info);
                setTimeoutId_info = setTimeout(function () {

                        $(".messageinfo").fadeOut().queue(function () {
                                $(".messageinfo").remove();
                        });
                }, 2000);
        }
})();

/*
 * v-checkbtn 组件
 * <div class="v-checkbtn">
		<div class="v-checkbtn-item " data-val="true">
			爱心
		</div>
	</div>
	
	 // 自定义事件
	$(".v-checkbtn").on("v-checkbtn", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".v-checkbtn.a1").VuecheCkbtn(true);
	// get
	 var v=$(".v-checkbtn.a1").VueCheckbtn();
	 alert(v)
	
 * */

(function () {

	// 单选
	$(document).on("click", ".v-checkbtn .v-checkbtn-item", function () {

		$(this).toggleClass("active");
		var bl = $(this).hasClass("active");

		// 触发自定义的事件
		$(this).trigger("v-checkbtn", [bl]);
	});

	$.fn.extend({

		VueCheckbtn: function VueCheckbtn(v) {
			if (typeof v !== "undefined") {
				v = !!v;

				if (v) {
					$(this).find(".v-checkbtn-item").addClass("active");
				} else {
					$(this).find(".v-checkbtn-item").removeClass("active");
				}
			} else {

				return $(this).find(".v-checkbtn-item").hasClass("active");
			}
		}
	});

	// 多选

	/*
 	* v-checkbtn-group 组件
  <div class="v-checkbtn-group">
 		<div class="v-checkbtn-item " data-val="js">js</div>
 		<div class="v-checkbtn-item " data-val="jquery">jquery</div>
 		<div class="v-checkbtn-item " data-val="java">java</div>
 		<div class="v-checkbtn-item " data-val="c#">c#</div>
 		<div class="v-checkbtn-item " data-val="nodejs">nodejs</div>
 		</div>
 </div>
 
 // v-checkbtn-group自定义事件
 $(".v-checkbtn-group").on("v-checkbtn-group", function(event, el,bl,arrs) {
 	
 	$.alert("选择的值为:"+arrs);
 });
 
 //set 
 $(".v-checkbtn-group").VueCheckbtnGroup(["js","c#"]);
 
 // get
 var v=$(".v-checkbtn-group").VueCheckbtnGroup();
 alert(v)
 
 //set 
 //var dst = ["视频监控", "音视频通话", "查看机器人状态","设置机器人"];
 //$(" ._select-module .v-checkbtn-group").VueCheckbtnGroup(item=>dst.some(o => o == item));
 // get
 //var v=$("._select-module .v-checkbtn-group").VueCheckbtnGroup();
 * */

	$(document).on("click", ".v-checkbtn-group .v-checkbtn-item", function () {

		$(this).toggleClass("active");
		var bl = $(this).hasClass("active");
		var arrs = [];
		var p = $(this).parents(".v-checkbtn-group");
		$(".v-checkbtn-item", p).each(function () {

			if ($(this).hasClass("active")) {
				var v = $(this).attr("data-val") || "";
				if (v.trim() !== "") {
					arrs.push(v);
				}
			}
		});

		// 触发自定义的事件
		$(this).trigger("v-checkbtn-group", [bl, arrs]);
	});

	$.fn.extend({

		VueCheckbtnGroup: function VueCheckbtnGroup(args) {
			var items = $(this).find(".v-checkbtn-item");
			if (typeof args === "function") {

				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					var val = $(item).attr("data-val") || "";
					var bl = args(val);
					if (bl) {
						$(item).addClass("active");
					} else {
						$(item).removeClass("active");
					}
				}

				return;
			} else if (args instanceof Array) {
				for (var i2 = 0; i2 < items.length; i2++) {
					var item2 = items[i2];
					var v = $(item2).attr("data-val") || "";
					for (var y = 0; y < args.length; y++) {
						if (v === args[y]) {
							$(item2).addClass("active");
							break;
						} else {
							$(item2).removeClass("active");
						}
					}
				}
			} else {
				var arrs = [];
				$(".v-checkbtn-item", this).each(function () {
					if ($(this).hasClass("active")) {
						var v = $(this).attr("data-val") || "";
						if (v.trim() !== "") {
							arrs.push(v);
						}
					}
				});

				return arrs;
			}
		}
	});
})();

})));
