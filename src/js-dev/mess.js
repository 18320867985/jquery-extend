/*
 * 消息框
  
 	1.confirm 确认框
  
  <div class="message">
			<div class="message-mask"></div>
			<div class="confirm-box">
				<h4 class="ttl">
				是否要确认删除数据?
			</h4>
				<button class="ok confirm-btn" type="button">确认</button>
				<button class="cancel confirm-btn" type="button">取消</button>
			</div>
	</div>
	
	// js
	$(function() {
		$("#btn").click(function() {
			$(this).confirm("", function() {
			console.log(this)
			},function(){})
		});

	});
	
	
	2.alert 
 	<div class="message">
			<div class="message-mask"></div>
			<div class="alertt-box">
				<h4 class="ttl alert">
				没有选择数据!
			</h4>
				<button class="ok message-box-btn alert" type="button">确认</button>
				
			</div>
	</div>
	
	// js
	$(function() {
		$("#btn").click(function() {
			$(this).alert("没有选择数据!");

	});
 * */

(function() {

	//  confirm
	jQuery.fn.extend({

		confirm: function(tipText,mess, okfun, cancelfun,obj) {
			if(!arguments.length >= 2) {

				throw new Error("property is must two");
            }

           
            obj = obj || {};
			var _okText = obj.ok || "确认";
			var _cancelText = obj.cancel || "取消";

			this.each(function(i, v) {
                tipText = "提示";
                mess = mess || "此操作将永久删除该文件, 是否继续?";
				$(".message").remove();

				// 创建message
                var tip = document.createElement("div");
                tip.setAttribute("class", "tip");
                tip.innerText = tipText;

				var message = document.createElement("div");
				message.setAttribute("class", "message");
				var message_mask = document.createElement("div");
				message_mask.setAttribute("class", "message-mask");

				var message_box = document.createElement("div");
				message_box.setAttribute("class", "confirm-box");

				var ttl = document.createElement("h4");
				ttl.setAttribute("class", "ttl");
				ttl.innerText = mess;

				var ok_btn = document.createElement("button");
				ok_btn.setAttribute("type", "button");
				ok_btn.setAttribute("class", "ok confirm-btn");
				ok_btn.innerText = _okText;

				var cancel_btn = document.createElement("button");
				cancel_btn.setAttribute("type", "button");
				cancel_btn.setAttribute("class", "cancel confirm-btn");
				cancel_btn.innerText = _cancelText;

                message_box.appendChild(tip);
				message_box.appendChild(ttl);
                message_box.appendChild(ok_btn);
                message_box.appendChild(cancel_btn);
           
				message.appendChild(message_mask);
				message.appendChild(message_box);

				var elm = document.body || document.documentElement;
				elm.appendChild(message);

				$(".message").fadeIn();
				$(".message").on("click", ".confirm-btn.ok", function(e) {

					if(typeof okfun === "function") {
						$(".message").remove();
						okfun.call(this,v);
					}

				});

				$(".message").on("click", ".confirm-btn.cancel", function(e) {

					if(typeof cancelfun === "function") {

						cancelfun.call(this,v);
					}
					$(".message").remove();
				});

			});
		}

	});

	//  confirm
	jQuery.extend({
		confirm: function(mess, okfun, cancelfun, obj) {
			if(!arguments.length >= 2) {

				throw new Error("property is must two");
			}
			obj = obj || {};
			var _okText = obj.ok || "确认";
			var _cancelText = obj.cancel || "取消";

			mess = mess || "是否确认删除数据?";
			$(".message").remove();

			// 创建message
			var message = document.createElement("div");
			message.setAttribute("class", "message");
			var message_mask = document.createElement("div");
			message_mask.setAttribute("class", "message-mask");

			var message_box = document.createElement("div");
			message_box.setAttribute("class", "confirm-box");

			var ttl = document.createElement("h4");
			ttl.setAttribute("class", "ttl");
			ttl.innerText = mess;

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

			$(".message").fadeIn();
			$(".message").on("click", ".confirm-btn.ok", function(e) {

				if(typeof okfun === "function") {
					$(".message").remove();
					okfun();
				}

			});

			$(".message").on("click", ".confirm-btn.cancel", function(e) {

				if(typeof cancelfun === "function") {
					cancelfun();
				}
				$(".message").remove();
			});

		},

	});

	//  alert
	jQuery.fn.extend({

		alert: _alert
	});

	//  alert
	jQuery.extend({

		alert: _alert
	});

	function _alert(mess, obj) {

		obj = obj || {};
		var _okText = obj.ok || "确定";

			mess = mess || "没有选择数据！";
			$(".message").remove();

			// 创建message
			var message = document.createElement("div");
			message.setAttribute("class", "message");
			var message_mask = document.createElement("div");
			message_mask.setAttribute("class", "message-mask");

			var message_box = document.createElement("div");
			message_box.setAttribute("class", "alert-box");

			var ttl = document.createElement("h4");
			ttl.setAttribute("class", "ttl");
			ttl.innerText = mess;

			var ok_btn = document.createElement("button");
			ok_btn.setAttribute("type", "button");
			ok_btn.setAttribute("class", "ok alert-btn");
			ok_btn.innerText = _okText;

			message_box.appendChild(ttl);
			message_box.appendChild(ok_btn);
			message.appendChild(message_mask);
			message.appendChild(message_box);

			var elm = document.body || document.documentElement;
			elm.appendChild(message);

			$(".message").fadeIn();
			$(".message").on("click", ".alert-btn.ok", function(e) {
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


	function _info(mess, type) {

		mess = mess || "信息提示框";
		$(".messageinfo").remove();
		var _class = "default";
		if(typeof type === "number") {
			switch(type) {
				case 0:
					_class = "default";
					break;
				case 1:
					_class = "success";
					break;
				case 2:
					_class = "warning";
					break;
				case 3:
					_class = "danger";
					break;
				default:
					_class = "default";
			}
		} else if(typeof type === "string") {
			switch(type) {
				case "default":
					_class = "default";
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

		message_box.appendChild(ttl);
		message.appendChild(message_box);

		var elm = document.body || document.documentElement;
		elm.appendChild(message);

		$(".messageinfo").fadeIn(600);
		var setTimeoutId = setTimeout(function() {
			$(".messageinfo").fadeOut().queue(function() {
				$(".messageinfo").remove();
				clearTimeout(setTimeoutId);
			});

			//alert()
		}, 1500);

	}

})();