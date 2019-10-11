
/*
 * 页面上的引用： <include src="../../template/_nav2.html" ></include>
 * 页面导航active激活的样式  data-nav data-index="0" 
 1.
    <nav class="nav">
        <a  class ="nav-item  active" href="#">全部</a>
        <a  class ="nav-item "href="#">行业新闻</a>
        <a  class ="nav-item "href="#">上游动态</a>
        <a  class ="nav-item " href="#">品名日评</a>
        <a  class ="nav-item " href="#">塑料期货</a>
    </nav>
2.
<ul class="nav">
    <li class="active"><a href="../index">首页</a></li>
    <li class=""><a href="../pricevs"><img src="../../static/images/index/hot.png" alt="价格对比" /> 价格对</a></li>
    <li class=""><a href="../hyzx/index.html">行业资讯</a></li>
    <li class=""><a href="../xuelian/information.html">行业资料</a></li>
    <li class=""><a href="javascript:;">价格走势</a></li>
    <li class=""><a href="../matter">物性表</a></li>
    <li class=""><a href="javascript:;">关于我们</a></li>
</ul>

*/

(function() {

	/*创建include对象*/
    var _include = window.include;
    var _define = window.define;
    var _require = window.require;
    var include = window.include = function (selector, content) { };

	include.extend = function(obj) {
		if (typeof obj === "object") {
			for (var i in obj) {
				this[i] = obj[i];
			}
		}

		return this;
    };

    // base url;
    include.fineObjs = {};
    include.baseUrl = "";
    include.urls = [];
    include.caches=[];

    include.ckUrl = function (url) {

        for (var i = 0; i < include.urls.length; i++) {
            var _url = include.urls[i];
            if (url === _url) {
                return false;
            }
        }

        return true;

    };

    // 定义执行函数
    window.define= include.define = function () {
       
        var arg1;
      
        // 定义的函数
        var name = "include_" + new Date().getTime() + "_" + Math.floor(Math.random() * 1000);
        if (arguments.length === 1 && typeof arguments[0] === "function") {
            
               arg1 = arguments[0];
        }

        if (arguments.length === 2 && arguments[0] instanceof Array && typeof arguments[1] === "function") {

            arg1 = arguments[1];
        }

        // 兼容jquery
        if (arguments.length === 3 && typeof arguments[0] === "string" && arguments[1] instanceof Array && typeof arguments[2] === "function") {

            arg1 = arguments[2];
        }

        if (arguments.length >= 1) {
            var src = _getCurrentScript();

            include.fineObjs[name] = {
                fn: arg1,
                isOnlyRun: true,
                url: src
            };

      
        }
       
 
        return this;
    };

    // amd module extend
    window.define.extend = function (obj) {

        if (typeof obj === "object") {
            for (var i in obj) {
                this[i] = obj[i];
            }
        }

        return this;
    };

    // define.amd
    window.define.extend({ amd: true });

    // 异步并行加载js  全部加载完成再执行函数
    window.require= include.require  = function () {

        if (arguments.length >= 2 && arguments[0] instanceof Array && typeof arguments[1] === "function") {
            var arg1 = arguments[0];
            var fn2 = arguments[1];

            // 遍历器
            var activeUrls = _activeUrls(arg1);
           
           // console.log("arg1", arg1);
            var itr = include.iterator(activeUrls);
          
            var bl = true;
            for (var i = 0; i < activeUrls.length; i++) {
                if (include.ckUrl(activeUrls[i])) {
                    include.urls.push(activeUrls[i]);
                    _addAllIterator(itr, fn2, activeUrls[i], arg1);
                    bl = false;
                }
            }

            if (bl) {
                fn2.apply(null, _getCaches(arg1));
            }
        }

        return this;
    };

    // 添加AMD 新建 script
    function _addAllIterator(itr, fn2,url,arrs) {

        var doc = document.body || document.getElementsByTagName('body')[0];
     
            var _url = include.baseUrl + url;
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = _url;
            script.setAttribute("data-src", _url);
            doc.appendChild(script);
        
            //js加载完成执行方法 ie9+
            if (window.addEventListener) {

                script.onload = function (e) {

                    var itrObj = itr.next();
                    
                    if (itrObj.done) {   
                        include.runIncludeAndCache();
                        fn2.apply(null, _getCaches(arrs));
                    }     
                
                };
            } else {

               // ie8 
                console.log(script.readyState);
                if (script.readyState) {
                    if (script.readyState === "loading" || script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = function () {
                            
                            var itrObj = itr.next();
                            if (itrObj.done) {
                                include.runIncludeAndCache();
                                var lst = _getCaches(arrs);
                                fn2.apply(null, lst);

                            } 
                            script.onreadystatechange = null;
                        };
                    }
                }
            }
        }
               
    // run include.define and  caches
    include.runIncludeAndCache = function () {
    
        for (var name in include.fineObjs) {

            var o = include.fineObjs[name];
            if (typeof o === "object") {
                if (typeof o.fn === "function" && o.isOnlyRun === true) {
                   
                    var res= o.fn();
                    o.isOnlyRun = false;
                    include.caches.push({
                        v: res,
                        url:o.url
                    });

                   
                }
            }
        }
    };

    // run include.define
    include.runInclude = function () {

        for (var name in include.fineObjs) {
            var o = include.fineObjs[name];

            if (typeof o === "object") {
                if (typeof o.fn === "function" && o.isOnlyRun === true) {
                    o.fn();
                    o.isOnlyRun = false;
                }
            }
        }
    };

    // 获取列表缓存
    function _getCaches(list) {
        var arrs = [];

        for (var i = 0; i < list.length; i++) {
            var _url = include.baseUrl+list[i];
         
            for (var y = 0; y < include.caches.length; y++) {
                var o2 = include.caches[y];
                if (_url === o2.url) {
                    arrs.push(o2.v);
                    break;
                }
            }
        }

        return arrs;

    }

    // 激活activeUrls
    function _activeUrls(list) {
        var arrs = [];
        for (var i = 0; i < list.length; i++) {
            var _url =  list[i];

            var bl = true;
            for (var y = 0; y < include.urls.length; y++) {
                var _url2 = include.urls[y];
                if (_url === _url2) {
                    bl = false;
                }
            }

            if (bl) {
                arrs.push(_url);
            }         
        }

        return arrs;
    }

    // getCurrentScript
    function _getCurrentScript() {

        if (document.currentScript) { 

            return document.currentScript.getAttribute("data-src") || "";
        }
        else {
            var stack, e, saf, nodes = document.getElementsByTagName("script");
            for (var i = 0, node; i < nodes.length; i++) {
                node = nodes[i];
                if (node.readyState === "interactive") {
                    // ie8 ,ie9 ie10
                    return node.getAttribute("data-src") || "";
                }
                else if (!node.readyState) {

                    // ie11
                    try {
                        throw Error("强制报错,以便捕获e.stack,获取JS路径有误");

                    } catch (e) {
                        stack = e.stack;
                      
                        if (e.sourceURL) {
                        //safari
                            saf = e.sourceURL;
                        }
                    }
                    if (stack) {
                       
                        e = stack.indexOf(' at ') !== -1 ? ' at ' : '@';
                        while (stack.indexOf(e) !== -1) {
                            stack = stack.substring(stack.indexOf(e) + e.length);
                        }
           
                        var mchs = stack.match(/(http|https):\/\/.*\.js/)[0];
                        mchs = mchs.split("/");
                        mchs = mchs[mchs.length - 1];
                        var mch = mchs.match(/.*\.js$/)[0];
                        var srp = _getScriptByFileName(mch);
                        var src=  srp.getAttribute("data-src");
                        return src;
                    }

                    
                }
            }
        }
    }

    // getScriptByFileName
    function _getScriptByFileName(fileName) {
        var srps = document.getElementsByTagName("script");
        var list = [];
        for (var i = 0; i < srps.length; i++) {
            var o = srps[i];
            var reg = new RegExp(fileName, "img");
            var src = o.getAttribute("src");
            if (reg.test(src)) {
                list.push(o);

            }
        }

        return list.length > 0 ? list[list.length - 1] : {};
    }

    // 遍历器生成函数
    include.iterator = function (array) {
        var nextIndex = 0;
        return {
            next: function () {
                var _index = array.length - 1;
                var _nextIndex = nextIndex;
                return nextIndex < array.length ?
                    { value: array[nextIndex++], done: _nextIndex >= _index ? true : false } :
                    { value: undefined, done: true };
            }
        };
    };

	// ajax type
	function _ajaxFun(url, type, data, _arguments) {
		var success;
		var error;
		var progress;
		if (typeof data === "object" && _arguments.length > 2) {
			success = _arguments[2];
			if (_arguments.length >= 3) {
				error = _arguments[3];
				progress = _arguments[4] || null;
			}
		} else if (typeof data === "function") {
			success = data;
			if (_arguments.length > 2) {
				error = _arguments[2];
				progress = _arguments[3] || null;
			}
		}

		include.ajax({
			type: type,
			url: url,
			data: typeof data === "object" ? data : null,
			success: success,
			error: error,
			progress: progress
		});

	}

	// 链接ajax发送的参数数据
	function _JoinParams(data) {

		var params = [];
		if (data instanceof Object) {
			_compilerparams(params, data, "");
		}
		return params.join("&") || "";

	}

	function _compilerparams(params, data, preKey) {
		preKey = preKey || "";

		for (var key in data) {
			var data2 = data[key];

			if (data2 === undefined) {
				continue;
			} else if (data2 !== null && data2.constructor === Object) {
				for (var key2 in data2) {

					var _key = "";
					var _key2 = "[" + key2 + "]";
					if (preKey === "") {
						_key = preKey + key + _key2;
					} else {
						_key = preKey + "[" + key + "]" + _key2;
					}

					var _value = data2[key2];

					if (_value.constructor === Array || _value.constructor === Object) {

						_compilerparams(params, _value, _key);
					} else {
						params.push(encodeURIComponent(_key) + '=' + encodeURIComponent(_value));
					}

				}
			} else if (data2 !== null && data2.constructor === Array) {

				for (var key2_ in data2) {
					var data3 = data2[key2_];
					if (typeof data3 === "object") {
						for (var key3 in data3) {

							var _key_ = "";
							var _key2_ = "[" + key2_ + "]" + "[" + key3 + "]";
							if (preKey === "") {
								_key_ = preKey + key + _key2_;
							} else {
								_key_ = preKey + "[" + key + "]" + _key2_;
							}

							var _value_ = data3[key3];

							if (_value_.constructor === Array || _value_.constructor === Object) {

								_compilerparams(params, _value_, _key_);
							} else {
								params.push(encodeURIComponent(_key_) + '=' + encodeURIComponent(_value_));
							}

						}
					} else {
						var _key_2 = preKey + key + "[]";
						var _value_2 = data3;
						params.push(encodeURIComponent(_key_2) + '=' + encodeURIComponent(_value_2));
					}

				}

			} else {
				var _key_3 = "";
				if (preKey === "") {
					_key_3 = preKey + key;
				} else {
					_key_3 = preKey + "[" + key + "]";
				}
				var dataVal = data[key];
				dataVal = dataVal === null ? "" : dataVal;
				params.push(encodeURIComponent(_key_3) + '=' + encodeURIComponent(dataVal));

			}

		}
	}

	include.extend({

		// create XHR Object
		createXHR: function() {

			if (window.XMLHttpRequest) {

				//IE7+、Firefox、Opera、Chrome 和Safari
				return new XMLHttpRequest();
			} else if (window.ActiveXObject) {

				//IE6 及以下
				var versions = ['MSXML2.XMLHttp', 'Microsoft.XMLHTTP'];
				for (var i = 0, len = versions.length; i < len; i++) {
					try {
						return new ActiveXObject(version[i]);

					} catch (e) {
						//跳过
					}
				}
			} else {
				throw new Error('浏览器不支持XHR对象！');
			}

		},

		/* 封装ajax函数
		 @param {string}opt.type http连接的方式，包括POST和GET两种方式
		 @param {string}opt.url 发送请求的url
		 @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
		 @param {object}opt.data 发送的参数，格式为对象类型
		 @param {function}opt.contentType   内容类型
		 @param {function}opt.success ajax发送并接收成功调用的回调函数
		 @param {function}opt.error ajax发送并接收error调用的回调函数
		 @param {function}opt.getXHR 获取xhr对象
		 @param {number}opt.timeout // 超时
		*/
		ajax: function(opt) {

			// 参数object对象
			opt = opt || {};
			opt.type = typeof opt.type === "string" ? opt.type.toUpperCase() : "GET";
			opt.url = typeof opt.url === "string" ? opt.url : '';
			opt.async = typeof opt.async === "boolean" ? opt.async : true;
			opt.data = typeof opt.data === "object" ? opt.data : {};
			opt.success = opt.success || function() {};
			opt.error = opt.error || function() {};
			opt.contentType = opt.contentType || "application/x-www-form-urlencoded;charset=utf-8";
			opt.progress = opt.progress || {};

			var xhr = include.createXHR();
			if (typeof opt.timeout === "number") {
				xhr.timeout = opt.timeout;
			}

			xhr.xhrFields = opt.xhrFields || {};

			// 连接参数
			var postData = _JoinParams(opt.data); // params.join('&');

			if (opt.type.toUpperCase() === 'POST' || opt.type.toUpperCase() === 'PUT' || opt.type.toUpperCase() === 'DELETE') {
				opt.url = opt.url.indexOf("?") === -1 ? opt.url + "?" + "_=" + Math.random() : opt.url + "&_=" + Math.random();

				xhr.open(opt.type, opt.url, opt.async);
				xhr.setRequestHeader('Content-Type', opt.contentType);
				xhr.send(postData);
			} else if (opt.type.toUpperCase() === 'GET') {
				if (postData.length > 0) {
					postData = "&" + postData;
				}
				opt.url = opt.url.indexOf("?") === -1 ? opt.url + "?" + "_=" + Math.random() + postData : opt.url + "&_=" +
					Math.random() + postData;

				xhr.open(opt.type, opt.url, opt.async);
				xhr.send(null);
			}
			xhr.onreadystatechange = function() {

				if (xhr.readyState === 4) {
					if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
						if (typeof opt.success === "function") {
							try {
								opt.success(JSON.parse(xhr.responseText), xhr.status, xhr.statusText);
							} catch (e) {
								//TODO handle the exception
								opt.success(xhr.responseText, xhr.status, xhr.statusText);
							}

						}
					} else {
						if (typeof opt.error === "function") {
							opt.error(xhr.status, xhr.statusText);
						}
					}

				}
			};

		},

		// get
		get: function(url, data) {
			_ajaxFun(url, "get", data, arguments);
		},

		// html字符串转dom对象
		htmlStringToDOM: function(txt) {

			var df2 = document.createDocumentFragment();
			var df = document.createElement("div");
			var div = document.createElement("div");
			div.innerHTML = txt;
			df.appendChild(div);
			var _nodes = df.getElementsByTagName("div")[0].childNodes;
			for (var i = _nodes.length; i > 0; i--) {
				if (window.addEventListener) {
					df2.insertBefore(_nodes[i - 1], df2.childNodes[0]);
				} else {
					df2.insertBefore(_nodes[i - 1], df2.firstChild);

				}

			}
			df = null;
			return df2;

		}

	});

})();

(function() {

	if (window.addEventListener) {
		window.addEventListener("load", function() {
			includeHtml();
		});
	} else {
		window.attachEvent("onload", function() {
			includeHtml();
		});
	}

	function includeHtml() {
		var _htmls = document.getElementsByTagName("include");

		for (var i = 0; i < _htmls.length; i++) {

			(function(obj) {

				var src = obj.getAttribute("src");
				var prop = obj.getAttribute("obj") || "";

				if (prop) {
					prop = JSON.parse(prop);
				} else {
					prop = {};
				}

				include.get(src, prop, function(data) {

                    var newElement = include.htmlStringToDOM(data);

                    /*---------------------- 激活的样式--------------------------------*/
					var index = obj.getAttribute("data-index") || "";
                    var isNav = obj.hasAttribute("data-nav");
                    if (isNav) {

                       
						if (!isNaN(index)) {
							index = window.parseInt(index);

							// native
							var els_nav = newElement.querySelectorAll(".nav");
							for (var nav_i = 0; nav_i < els_nav.length; nav_i++) {

								// li
								var nav_items = els_nav[nav_i].querySelectorAll("li");
								for (var nav_i2 = 0; nav_i2 < nav_items.length; nav_i2++) {
									var classList = nav_items[nav_i2].getAttribute("class") || "";
									classList = classList.replace("active", "");
									nav_items[nav_i2].setAttribute("class", classList);
									if (nav_i2 === index) {
										nav_items[nav_i2].setAttribute("class", classList + " active");
									}

								}
								// .nav-item
								var nav_items3 = els_nav[nav_i].querySelectorAll(".nav-item");
								for (var nav_i3 = 0; nav_i3 < nav_items3.length; nav_i3++) {
									var classList3 = nav_items3[nav_i3].getAttribute("class") || "";
									classList3 = classList3.replace("active", "");
									nav_items3[nav_i3].setAttribute("class", classList3);
									if (nav_i3 === index) {
										nav_items3[nav_i3].setAttribute("class", classList3 + " active");
									}

								}

							}
						}
					}

                    /*----------------------添加 style 标签 兼容 ie9+--------------------------------*/
					var els_style = newElement.childNodes;
					var doc_style = document.createDocumentFragment();
					for (var i0 = els_style.length - 1; i0 >= 0; i0--) {
						var el = els_style[i0];
                        if (el.nodeType === 1 && el.nodeName === "STYLE") {
                            if (window.addEventListener) {doc_style.insertBefore(el, doc_style.childNodes[0]); }
                            else {
                                doc_style.insertBefore(el, doc_style.firstChild);
                            }
								
						}
					}
                    document.getElementsByTagName("head")[0].appendChild(doc_style);

                    /* ----------------------添加 link 标签 兼容 ie9 + --------------------------------*/
                    var els_link = newElement.childNodes;
                    var doc_link = document.createDocumentFragment();
					for (var i1 = els_link.length - 1; i1 >= 0; i1--) {
                            var el1 = els_link[i1];
                           
                            if (el1.nodeType === 1 && el1.tagName === "LINK") {
                              
                                if (window.addEventListener) { doc_link.insertBefore(el1, doc_link.childNodes[0]); }

                                else {
                                    doc_link.insertBefore(el1, doc_link.firstChild);
                                }
							}
						}
                    document.getElementsByTagName("head")[0].appendChild(doc_link);

					/*----------------------添加 script 标签 兼容 ie8+--------------------------------*/
					var els_scriprt = newElement.childNodes;
                    var doc_script = document.createDocumentFragment();

                    // 添加 新建 script
                    for (var i2 = 0; i2 < els_scriprt.length; i2++) {
                        var el2 = els_scriprt[i2];
                        var doc = document.body || document.getElementsByTagName('body')[0];
                        if (el2.nodeType === 1 && el2.tagName === "SCRIPT") {

                            var script = document.createElement("script");
                            script.type = "text/javascript";

                            // 有 src属性值 链接
                            if (el2.src) {
                               
                                script.src = el2.getAttribute("src") || "";
                              
                                if (window.addEventListener) {
                                    doc.insertBefore(script, doc_script.childNodes[0]);
                                } else {
                                    //doc.appendChild(script);
                                    doc.insertBefore(script, doc_script.firstChild);
                                }

                                //js加载完成执行方法 ie9+
                                if (window.addEventListener) {
                                    script.onload = function (e) {
                                         include.runInclude();

                                    };
                                } else {

                                    // ie8 
                                    if (script.readyState) {
                                        if (script.readyState === "loading" ||script.readyState === "loaded" || script.readyState ==="complete") {
                                            script.onreadystatechange = function () {
                                                include.runInclude();
                                                script.onreadystatechange = null;
                                            };
                                        }
                                    }
                                }
                            } else {

                                // 没有src属性值 应用script 为本内容
                                var jscontent = el2.innerHTML || "";
                                if (jscontent) {
                                   
                                    // ie9+
                                    if (window.addEventListener) {
                                        doc.insertBefore(script, doc_script.childNodes[0]);
                                        script.innerHTML = jscontent;
                                    } else {
                                     // ie8
                                        doc.insertBefore(script, doc_script.firstChild);
                                        script.jscode= jscontent;
                                        window.eval(jscontent);
                                    }

                                     include.runInclude();
                                }
                            }
						}
                    }

                    // 删除原有 script
                    for (var i3 = els_scriprt.length-1;  i3>=0; i3-- ){
                        var el3 = els_scriprt[i3];
                        if (el3.nodeType === 1 && el3.tagName === "SCRIPT") {

                            // 删除节点
                            if (el3.parentNode) {
                                var els = el3.parentNode;
                                els.removeChild(el3);
                            }

                        }
                    }

                    document.getElementsByTagName("body")[0].appendChild(doc_script);

                    // 添加到document
					var parent = obj.parentNode;
					parent.replaceChild(newElement, obj);

				});

			})(_htmls[i]);

		}
	}

})();
