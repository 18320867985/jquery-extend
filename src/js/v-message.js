
/*  hqs */

(function() {

    function addHtmlPadding() {
        var win_h = $(window).outerHeight();
        var doc_h = $(document).outerHeight();
        if (doc_h > win_h) {
            $("html").addClass("html-v-message");
        }
    }
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

        addHtmlPadding();
        obj = obj || {};
        var _okText = obj.ok || "确认";
        var _cancelText = obj.cancel || "取消";

            mess = mess || "此操作将永久删除该文件, 是否继续?";
            $(".v-message").remove();

            var message = document.createElement("div");
            message.setAttribute("class", "v-message");
            var message_mask = document.createElement("div");
            message_mask.setAttribute("class", "v-message-mask");
            var message_box = document.createElement("div");
            message_box.setAttribute("class", "confirm-box");

            // 创建v-message
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

        $(".v-message").stop().fadeIn();
        $(".confirm-btn.ok").focus();
            $(".v-message").on("click", ".confirm-btn.ok", function (e) {

                if (typeof okfun === "function") {
                    $(".v-message").remove();
                    $("html").removeClass("html-v-message");
                    okfun.call(this);
                   
                }

            });

            $(".v-message").on("click", ".confirm-btn.cancel", function (e) {

                if (typeof cancelfun === "function") {
                    cancelfun.call(this);
                }
                $(".v-message").remove();
                $("html").removeClass("html-v-message");
            });

            $(".v-message").on("click", "._close", function (e) {

                $(".v-message").remove();
                $("html").removeClass("html-v-message");
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
    function _prompt(tipText, mess, okfun, cancelfun,pwd) {
        if (!arguments.length >= 2) {

            throw new Error("property is must two");
        }
        addHtmlPadding();
       var obj= {};
        var _okText = obj.ok || "确认";
        var _cancelText = obj.cancel || "取消";

        mess = mess || "此操作将永久删除该文件, 是否继续?";
        $(".v-message").remove();

        var message = document.createElement("div");
        message.setAttribute("class", "v-message");
        var message_mask = document.createElement("div");
        message_mask.setAttribute("class", "v-message-mask");
        var message_box = document.createElement("div");
        message_box.setAttribute("class", "confirm-box");

        // 创建v-message
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

        $(".v-message").stop().fadeIn();
        $(".v-message .txt").focus();
        $(".v-message").on("click", ".confirm-btn.ok", function (e) {

            if (typeof okfun === "function") {

                var p = $(this).parents(".v-message");
                var v = $(".txt", p).val();
                if (okfun.call(this,v,$("p.err",p))) {
                    $(".v-message").remove();
                    $("html").removeClass("html-v-message");
                }
            }

        });

        $(".v-message").on("click", ".confirm-btn.cancel", function (e) {

            if (typeof cancelfun === "function") {

                cancelfun.call(this);
            }
            $(".v-message").remove();
            $("html").removeClass("html-v-message");
        });

        $(".v-message").on("click", "._close", function (e) {

            $(".v-message").remove();
            $("html").removeClass("html-v-message");
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
    function _alert(tipText, mess,okfun,obj) {
        if (!arguments.length >= 2) {

            throw new Error("property is must two");
        }

        addHtmlPadding();
        obj = obj || {};
        var _okText = obj.ok || "确定";
     
        mess = mess || "这是提示信息";
        $(".v-message").remove();
        var message = document.createElement("div");
        message.setAttribute("class", "v-message");
        var message_mask = document.createElement("div");
        message_mask.setAttribute("class", "v-message-mask");
        var message_box = document.createElement("div");
        message_box.setAttribute("class", "confirm-box");

        // 创建v-message
        if (tipText !== null) {
        
            tipText = tipText||"提示";
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

        $(".v-message").stop().fadeIn();
        $(".confirm-btn.ok").focus();
        $(".v-message").on("click", ".confirm-btn.ok", function (e) {
            $(".v-message").remove();
            $("html").removeClass("html-v-message");
            if (typeof okfun === "function") {
                okfun.call(this);
            }

        });
        $(".v-message").on("click", "._close", function (e) {

            $(".v-message").remove();
            $("html").removeClass("html-v-message");
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
		$(".v-messageinfo").remove();
		var _class = "default";
		if(typeof type === "string") {
			switch(type) {
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

		// 创建v-message
		var message = document.createElement("div");
		message.setAttribute("class", "v-messageinfo");

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

        $(".v-messageinfo").fadeIn(600);
        clearTimeout(setTimeoutId_info);
        setTimeoutId_info = setTimeout(function () {
           
			$(".v-messageinfo").fadeOut().queue(function() {
				$(".v-messageinfo").remove();
				
			});

		}, 2000);

    }


})();