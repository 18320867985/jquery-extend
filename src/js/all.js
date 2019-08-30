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
  <div class="v-checkbtn">
      <div class="v-checkbtn-item ">
          爱心
      </div>
   </div>
 */

(function () {

    // 单选
    $(document).on("click", ".v-checkbtn .v-checkbtn-item", function () {

        $(this).toggleClass("active");
        var bl = $(this).hasClass("active");

        // 触发自定义的事件
        $(this).trigger("v-checkbtn", [bl, this]);
    });

    $.fn.extend({

        VCheckbtn: function VCheckbtn(v) {
            if (typeof v !== "undefined") {
                v = !!v;

                if (v) {
                    $(this).find(".v-checkbtn-item").addClass("active");
                    $(this).trigger("v-checkbtn", [true, $(this).find(".v-checkbtn-item")[0]]);
                } else {
                    $(this).find(".v-checkbtn-item").removeClass("active");
                    $(this).trigger("v-checkbtn", [false, $(this).find(".v-checkbtn-item")[0]]);
                }
            } else {

                return $(this).find(".v-checkbtn-item").hasClass("active");
            }
        }
    });

    /* 多选
        * 
        <div class="v-checkbtn-group">
           <div class="v-checkbtn-item " data-val="js">js</div>
           <div class="v-checkbtn-item " data-val="jquery">jquery</div>
           <div class="v-checkbtn-item " data-val="java">java</div>
           <div class="v-checkbtn-item " data-val="c#">c#</div>
           <div class="v-checkbtn-item " data-val="nodejs">nodejs</div>
       </div>
    
       */

    $(document).on("click", ".v-checkbtn-group .v-checkbtn-item", function () {

        $(this).toggleClass("active");
        var arrs = [];
        var p = $(this).parents(".v-checkbtn-group");
        $(".v-checkbtn-item", p).each(function () {

            if ($(this).hasClass("active")) {
                var v = $(this).attr("data-val") || "";
                if ($.trim(v) !== "") {
                    arrs.push(v);
                }
            }
        });

        // 触发自定义的事件
        $(this).trigger("v-checkbtn-group", [arrs]);
    });

    $.fn.extend({

        VCheckbtnGroup: function VCheckbtnGroup(args) {
            var items = $(this).find(".v-checkbtn-item");
            var arrs = [];
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
                // 触发自定义的事件
                var list = [];
                $(".v-checkbtn-item", this).each(function () {
                    if ($(this).hasClass("active")) {
                        var v = $(this).attr("data-val") || "";
                        if ($.trim(v) !== "") {
                            list.push(v);
                        }
                    }
                });

                $(this).trigger("v-checkbtn-group", [list]);

                return;
            } else if (args instanceof Array) {
                var list2 = [];

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

                    // 触发自定义的事件
                    list2 = [];
                    $(".v-checkbtn-item", this).each(function () {
                        if ($(this).hasClass("active")) {
                            var v = $(this).attr("data-val") || "";
                            if ($.trim(v) !== "") {
                                list2.push(v);
                            }
                        }
                    });
                }

                $(this).trigger("v-checkbtn-group", [list2]);
            }
            // 全选 与 反选
            else if (typeof args === "boolean") {

                    var objs = $(this).find(".v-checkbtn-item");
                    var objs_list = [];
                    objs.each(function () {
                        if (args) {
                            var v = $(this).attr("data-val") || "";
                            $(this).addClass("active");
                            objs_list.push(v);
                        } else {

                            $(this).removeClass("active");
                        }

                        $(this).trigger("v-checkbtn-group", [objs_list]);
                    });
                } else {

                    $(".v-checkbtn-item", this).each(function () {
                        if ($(this).hasClass("active")) {
                            var v = $(this).attr("data-val") || "";
                            if ($.trim(v) !== "") {
                                arrs.push(v);
                            }
                        }
                    });

                    return arrs;
                }
        }
    });

    /* v-radiobtn-group  单选组件
      <div class="v-radiobtn-group">
        <div class="v-radiobtn-item" data-val="lingju">灵聚</div>
        <div class="v-radiobtn-item" data-val="tengxun">腾讯</div>
        <div class="v-radiobtn-item" data-val="xunfei">科大讯飞</div>
     </div>
      */

    $(document).on("click", ".v-radiobtn-item", function () {

        var p = $(this).parents(".v-radiobtn-group");
        p.find(".v-radiobtn-item").removeClass("active");
        $(this).addClass("active");

        // 触发自定义的事件
        $(this).trigger("v-radiobtn-group", [$(this).attr("data-val"), this]);
    });

    $.fn.extend({

        VRadiobtnGroup: function VRadiobtnGroup(index) {

            if (arguments.length >= 1) {
                if (!isNaN(index)) {
                    index = Number(index);
                    $(this).find(".v-radiobtn-item").removeClass("active");
                    $(this).find(".v-radiobtn-item").eq(index).addClass("active");

                    // 触发自定义的事件
                    var $active = $(this).find(".v-radiobtn-item.active");
                    $(this).trigger("v-radiobtn-group", [$active.attr("data-val") || "", $active.get(0)]);
                } else if (typeof index === "string") {
                    var $list = $(this).find(".v-radiobtn-item");
                    $list.removeClass("active");
                    $list.each(function () {

                        var v = $.trim($(this).attr("data-val") || "");
                        if (index === v) {
                            $(this).addClass("active");
                        }
                    });

                    // 触发自定义的事件
                    var $active2 = $(this).find(".v-radiobtn-item.active");
                    $(this).trigger("v-radiobtn-group", [$active2.attr("data-val") || "", $active2.get(0)]);
                }
            } else {

                return $(this).find(".v-radiobtn-item.active").attr("data-val") || "";
            }
        }
    });
})();

/*
	  
 <div class="v-number" >
    <button class="minus btn" type="button">-</button>
	<input class="num" type="number" value="1" data-min="0" data-max="9999" data-step="1" />
	<button class="plus btn" type="button">+</button>
	  
</div>
 
	 * 数字框组件start
	 * 事件：v-number
	 *
	 * 点击事件
		$(document).on("v-number",function(event,element){			
			//element 当前点击的元素	
			var p=$(element).parents(".v-number");
			alert($(p).find(".num").val());
								
		});
		
		//	$(".v-number").VNumber("8");
		// get
		//var v=$(".v-number").VNumber();
	 * */

(function () {

			//minus
			$(document).on("click", ".minus", function (e) {

						e.stopPropagation();
						e.preventDefault();

						var p = $(this).parents(".v-number");

						//步长
						var step = Number($(".num", p).attr("data-step"));
						step = window.isNaN(step) ? 1 : step;

						//最大值
						//			var max=Number($(".num",p).attr("data-max"));
						//				max=window.isNaN(max)?9999:max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						//计算
						v = v > min ? v - step : min;

						if (v <= min) {
									v = min;
						}

						$(".num", p).val(v);

						//点击触发自定义事件
						$(this).trigger("v-number", [v, p.get(0)]);
			});

			//plus
			$(document).on("click", ".plus", function (e) {
						e.stopPropagation();
						e.preventDefault();
						var p = $(this).parents(".v-number");

						//步长
						var step = Number($(".num", p).attr("data-step"));
						step = window.isNaN(step) ? 1 : step;

						//最大值
						var max = Number($(".num", p).attr("data-max"));
						max = window.isNaN(max) ? 9999 : max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						//计算
						v = v < max ? v + step : max;

						if (v >= max) {
									v = max;
						}

						$(".num", p).val(v);
						//点击触发自定义事件
						$(this).trigger("v-number", [v, p.get(0)]);
			});

			// value
			$(document).on("blur", ".num", function (e) {
						var p = $(this).parents(".v-number");
						//最大值
						var max = Number($(".num", p).attr("data-max"));
						max = window.isNaN(max) ? 9999 : max;
						//最小值
						var min = Number($(".num", p).attr("data-min"));
						min = window.isNaN(min) ? 0 : min;

						var v = Number($(".num", p).val());
						v = window.isNaN(v) ? min : v;

						if (v > max) {
									v = max;
						}

						if (v < min) {
									v = min;
						}

						$(".num", p).val(v);
						//点击触发自定义事件
						$(this).trigger("v-number", [v, p.get(0)]);
			});

			$.fn.extend({

						VNumber: function VNumber(v) {
									var $el = $(this).find(".num");
									if (arguments.length >= 1) {

												var min = parseFloat($el.attr("data-min") || 0);
												var max = parseFloat($el.attr("data-max") || 9999);

												if (isNaN(v)) {
															v = min;
												} else {
															v = parseFloat(v);
															v = v < min ? min : v;
															v = v > max ? max : v;
												}

												$el.val(v);

												//点击触发自定义事件
												$(this).trigger("v-number", [v, $(this).get(0)]);
									} else if (arguments.length === 0) {
												return $el.val();
									}
						}

			});
})();

/*
 * v-checkbox 组件
 	
 	<div class="v-checkbox" >
		<span class="v-checkbox-item iconfont"></span>
	</div>
	
	 // 自定义事件
	$(".v-checkbox").on("v-checkbox", function(event, el,bl) {

		$.alert("选择的值为:"+bl);
	});
	
	// set 
	$(".v-checkbox").VueCheckbox(true,fn);
	fn回调执行的函数
	$(".v-checkbox").VueCheckbox(true, (el) => {
		$(el).parents("li").addClass("active");
	});
	
	// get
	 var v=$(".v-checkbox").VueCheckbox();
	 alert(v)
 * */

(function () {

  // 单选 v-checkbox
  $(document).on("click", ".v-checkbox  .v-checkbox-item", function () {

    $(this).toggleClass("active");
    var bl = $(this).hasClass("active");
    // 触发自定义的事件
    $(this).trigger("v-checkbox", [bl, this]);
  });

  // 单选 v-checkbox
  $(document).on("click", ".v-checkbox  .v-checkbox-text", function () {

    var p = $(this).parents(".v-checkbox");
    $(".v-checkbox-item", p).toggleClass("active");
    var bl = $(".v-checkbox-item", p).hasClass("active");

    // 触发自定义的事件
    $(this).trigger("v-checkbox", [bl, this]);
  });

  $.fn.extend({

    VCheckbox: function VCheckbox(v) {
      console.log(v);
      if (arguments.length > 0) {
        v = !!v;
        if (v) {
          $(this).find(".v-checkbox-item").addClass("active");
          // 触发自定义的事件
          $(this).trigger("v-checkbox", [true, $(this).get(0)]);
        } else {
          $(this).find(".v-checkbox-item").removeClass("active");
          // 触发自定义的事件
          $(this).trigger("v-checkbox", [false, $(this).get(0)]);
        }
      } else {

        return $(this).find(".v-checkbox-item").hasClass("active");
      }
    }
  });
})();

/* v-checkbox-group 组件
	<div class="v-checkbox-group">
		<div class="v-checkbox-group-item">
			<span class="v-checkbox-item iconfont" data-val="js"></span>
			<span class="v-checkbox-text">js</span>
		</div>
		<div class="v-checkbox-group-item">
			<span class="v-checkbox-item iconfont" data-val="jquery"></span>
			<span class="v-checkbox-text">jquery</span>
		</div>
		<div class="v-checkbox-group-item">
			<span class="v-checkbox-item iconfont" data-val="c#"></span>
			<span class="v-checkbox-text">c#</span>
		</div>

	</div>
	
	 // 自定义事件
		$(".v-checkbox-group").on("v-checkbox-group", function(event, el,bl) {
	
			$.alert("选择的值为:"+bl);
		});
		
		//set 
		$(".v-checkbox-group").VueCheckboxGroup([2,4]);
		
		// get
		var v=$(".v-checkbox-group").VueCheckboxGroup();
		alert(v)
		
		//set 
		//var dst = ["js", "c#"];
		//$(".v-checkbox-group").VueCheckboxGroup(item=>dst.some(o => o == item));
		// get
		//var v=$(".v-checkbox-group").VueCheckboxGroup();
	*/

(function () {

  // 单选组 v-checkbox-group
  $(document).on("click", ".v-checkbox-group  .v-checkbox-item", function () {

    $(this).toggleClass("active");
    var p = $(this).parents(".v-checkbox-group");
    var vals = [];
    $(".v-checkbox-item.active", p).each(function () {
      var v = $(this).attr("data-val");
      vals.push(v);
    });

    // 触发自定义的事件
    $(this).trigger("v-checkbox-group", [this, vals]);
  });

  // 单选 v-checkbox
  $(document).on("click", ".v-checkbox-group  .v-checkbox-text", function () {

    var p = $(this).parents(".v-checkbox-group-item");
    $(".v-checkbox-item", p).toggleClass("active");
    var p2 = $(this).parents(".v-checkbox-group");
    var vals = [];
    $(".v-checkbox-item.active", p2).each(function () {
      var v = $(this).attr("data-val");
      vals.push(v);
    });

    // 触发自定义的事件
    $(this).trigger("v-checkbox-group", [this, vals]);
  });

  $.fn.extend({

    VueCheckboxGroup: function VueCheckboxGroup(args) {

      if (typeof args === "function") {
        var items = $(this).find(".v-checkbox-item");
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
      }

      if (args instanceof Array) {

        var items = $(this).find(".v-checkbox-item");
        for (var i = 0; i < items.length; i++) {
          var item = items[i];
          for (var y = 0; y < args.length; y++) {
            if (i + 1 == args[y]) {
              $(item).addClass("active");
              break;
            }
          }
        }
      } else {
        var arrs = [];
        $(".v-checkbox-item", this).each(function () {
          if ($(this).hasClass("active")) {
            var v = $(this).attr("data-val") || "";
            if (v.trim() != "") {
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
