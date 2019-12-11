/*
hqs v-h5File
*/
+function () {

	var fileUpload = function (option, progressFun) {

		if (typeof option !== 'object') {
			alert("参数有误！");
			return;
		}

		var data = new FormData();
		data.append('file-' + new Date().getTime().toString(), option.data);
		var p = $(option.el).parents(".v-h5file-box");

		$.ajax({
			url: option.url,
			data: data,
			type: "post",
			dataType: option.dataType,
			timeout: option.outTime,
			cache: false,
			processData: false,
			contentType: option.contentType || false, // 为false 默认是 multipart/form-data boundary=----
			xhrFields: {
				withCredentials: false
			},
			xhr: function () {
				//获取ajaxSettings中的xhr对象，为它的upload属性绑定progress事件的处理函数
				var myXhr = $.ajaxSettings.xhr();
				if (myXhr.upload) {
					//检查upload属性是否存在 绑定progress事件的回调函数
					myXhr.upload.onprogress = progressFun;
				}
				return myXhr; //xhr对象返回给jQuery或zepto使用
			},
			success: function (data) {
				$(option.el).value = null;
				p.find(".v-h5file-all").hide();
				option.success(data);
			},
			error: function (err) {
				$(option.el).value = null;
				p.find(".v-h5file-all").hide();
				option.error(err);
			},
		});

	};


	window.vh5File = {
		upload: fileUpload

	};

}();