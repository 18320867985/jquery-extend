// utils.js

(function () {

    // url
    var _urlPath = {
        //采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r !== null) return decodeURIComponent(r[2]);
            return null;
        },

        // 取当前页面名称(不带后缀名)
        getPageName: function () {
            var a = location.href;
            var b = a.split("/");
            var c = b.slice(b.length - 1, b.length).toString(String).split(".");
            return c.slice(0, 1);
        },

        //取当前页面名称(带后缀名)
        getPageNameExention: function () {
            var strUrl = location.href;
            var arrUrl = strUrl.split("/");
            var strPage = arrUrl[arrUrl.length - 1];
            return strPage;
        }

    };

    /* 
    @expiresDate 为天数
    */
    var _cookie = {

        setCookie: function (cookieName, cookieValue, expiresDate) {
            cookieName = cookieName || "";
            if (cookieName === "") {
                return;
            }
            cookieValue = cookieValue || "";
        
            expiresDate = typeof expiresDate === "number" ? expiresDate : 0;
            var d = new Date();
            d.setTime(d.getTime() + (expiresDate*24*60*60*1000));
            var expires = expiresDate?"expires="+d.toUTCString():"";
            document.cookie = encodeURIComponent(_trim(cookieName)) + "=" + encodeURIComponent(JSON.stringify(cookieValue))+";path=/;"+expires;
            
        },

        getCookie: function (cookieName) {

            cookieName = cookieName || "";
            if (cookieName === "") {
                return;
            }
            var cookies =this.getAllCookie();
            return cookies[cookieName];

        },

        getAllCookie: function () {

            var strs = document.cookie.split(new RegExp(";\\s*"));
            var obj = {};
            for (var i = 0; i < strs.length; i++) {

                var strs2 = strs[i].split("=");
                
                try {
                    var _name = decodeURIComponent(strs2[0]);
                    var _val =JSON.parse(decodeURIComponent(strs2[1]));
                    obj[_name] = _val;
                } catch (ex) {
                   // console.log(ex);
                 
                }
            }

            return obj;
        },

        removeCookie: function (cookieName) {

           this.setCookie(cookieName, "", -1);

        }

    };

    //  window.localStorage
    var _localStorage = {

        //  window.localStorage存值永久有效
        setItem: function (item, value) {
            item = item.toString();

            window.localStorage.setItem(_trim(item), JSON.stringify(value));
        },

        //  window.localStorage取值
        getItem: function (item) {
            item = item.toString();
            var data = JSON.parse(window.localStorage.getItem(_trim(item)));
            return data;
        },

        // window.localStorage删除指定键对应的值
        removeItem: function (item) {
            item = item.toString();
            window.localStorage.removeItem(_trim(item));

        },
        clear: function () {
            window.localStorage.clear();
        }

    };

    //  window.sessionStorage
    var _sessionStorage = {

        //  window.sessionStorage 
        setItem: function (item, value) {
            item = item.toString();
            window.sessionStorage.setItem(_trim(item), JSON.stringify(value));
        },

        //  window.sessionStorage 取值
        getItem: function (item) {
            item = item.toString();
            var data = JSON.parse(window.sessionStorage.getItem(_trim(item)));
            return data;
        },

        //  window.sessionStorage 删除指定键对应的值
        removeItem: function (item) {
            item = item || "";
            item = item.toString();
            window.sessionStorage.removeItem(_trim(item));

        },

        clear: function () {
            window.sessionStorage.clear();
        }

    };

    // 浅复制 parentObj 父元素 childObj子元素
    var _extend = function (parentObj, childObj) {

        childObj = childObj || {};

        for (var prop in parentObj) {
            childObj[prop] = parentObj[prop];
        }
        return childObj;
    };

    // 深复制 parentObj 父元素 childObj子元素
    var _extendDeep = function (parentObj, childObj) {

        childObj = childObj || {};

        for (var prop in parentObj) {

            if (typeof parentObj[prop] === "object") {

                childObj[prop] = parentObj[prop].constructor === Array ? [] : {};
                extendDeep(parentObj[prop], childObj[prop]);

            } else {
                childObj[prop] = parentObj[prop];
            }
        }
        return childObj;
    };

    // 是否是函数
    var _isFunction = function (obj) {

        return typeof obj === "function";

    };

    // 是否是数组
    var _isArray = function (obj) {

        return obj.constructor === Array;

    };

    // 是否是空对象
    var _isEmptyObject = function (obj) {

        for (var prop in obj) {
            return false;
        }

        return true;

    };

    // 去掉首尾空字符串
    var _trim = function (txt) {
        var str = "";
        str = txt.toString().replace(/^\s*|\s*$/img, "");
        return str;
    };

    var _date = {

        // 根据年和月获取天数
        getDayCount: function (y, m) {
            var d = 1;
            switch (m) {
                case 1:
                    d = 31;
                    break;
                case 2:
                    d = 30;
                    if (y % 400 === 0 || (y % 4 === 0 && y % 100 !== 0)) {
                        //document.write(num + "是闰年。");
                        d = 29;
                    } else {
                        //document.write(num + "是平年。");
                        d = 28;
                    }

                    break;
                case 3:
                    d = 31;
                    break;
                case 4:
                    d = 30;
                    break;
                case 5:
                    d = 31;
                    break;
                case 6:
                    d = 30;
                    break;
                case 7:
                    d = 31;
                    break;
                case 8:
                    d = 31;
                    break;
                case 9:
                    d = 30;
                    break;
                case 10:
                    d = 31;
                    break;
                case 11:
                    d = 30;
                    break;
                case 12:
                    d = 31;
                    break;
            }

            return d;

        },

        //  把日期转换指定的格式
        toDate: function (value, fmt) {

            fmt = typeof fmt !== "string" ? "yyyy-MM-dd HH:mm:ss" : fmt;
            var txts = value.toString().replace("/Date(", "").replace(")/", "");
            var times = Number(txts);
            times = isNaN(times) ? new Date(value).getTime() : times;
            var dt = new Date(Number(times.toString()));
            var o = {
                "M+": dt.getMonth() + 1,
                "d+": dt.getDate(),
                "H+": dt.getHours(),
                "m+": dt.getMinutes(),
                "s+": dt.getSeconds(),
                "q+": Math.floor((dt.getMonth() + 3) / 3),
                "S": dt.getMilliseconds()
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (dt.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp("(" + k + ")").test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                }
            }
            return fmt;
        },

        // 倒计算天数的函数 
        getDateByNum: function (i, fmt) {
            fmt = fmt || "yyyy-MM-dd";
            var dt = new Date();
            var d = dt.getDate();

            var arrs = [];
            for (; i > 0; i--) {

                if (d === 1) {
                    arrs.push(bijia.date.toDate(dt, fmt));
                    var m = dt.getMonth();
                    dt.setUTCMonth(--m);
                    var y = dt.getFullYear();
                    m = dt.getMonth();
                    d = this.getDayCount(y, m + 1);

                } else {
                    d--;
                    arrs.push(this.toDate(dt, fmt));

                }
                dt.setUTCDate(d);
            }
            return arrs;

        },
 
    };

    // 数组列表
    var _list = {

        // max
        max: function (data, fn) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            var _array_max;
            var isOne = true;
            if (arguments.length === 1) {

                for (var i = 0; i < data.length; i++) {
                    var _temp = 0;

                    if (typeof data[i] !== "number") {

                        //  is not a number
                        var _num = parseFloat(data[i]);
                        if (isNaN(_num)) {
                            continue;
                        }
                        _temp = _num;

                    } else {

                        //  is a number
                        _temp = data[i];
                    }

                    if (isOne) {
                        _array_max = _temp;
                        isOne = false;

                    } else {
                        // set value number
                        if (_temp > _array_max) {
                            _array_max = _temp;
                        }

                    }

                }
                return _array_max;

            }

            if (arguments.length === 2 && typeof fn === "function") {

                var maxVal = 0;
                for (var i2 = 0; i2 < data.length; i2++) {
                    var _temp2 = 0;
                    var item = data[i2];
                    var v = fn(item);
                    if (typeof v !== "number") {

                        //  is not a number
                        var _num2 = parseFloat(v);
                        if (isNaN(_num2)) {
                            continue;
                        }
                        _temp2 = _num2;

                    } else {

                        //  is a number
                        _temp2 = v;
                    }

                    if (isOne) {
                        maxVal = _temp2;
                        _array_max = item;
                        isOne = false;

                    } else {
                        // set value number
                        if (_temp2 > maxVal) {
                            maxVal = _temp2;
                            _array_max = item;
                        }

                    }

                }
                return _array_max;

            }
        },

        // min
        min: function (data, fn) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            var _array_min;
            var isOne = true;
            if (arguments.length === 1) {
                for (var i = 0; i < data.length; i++) {
                    var _temp = 0;

                    if (typeof data[i] !== "number") {

                        //  is not a number
                        var _num = Number(data[i]);
                        if (isNaN(_num)) {
                            continue;
                        }
                        _temp = _num;

                    } else {

                        //  is a number
                        _temp = data[i];
                    }

                    if (isOne) {
                        _array_min = _temp;
                        isOne = false;

                    } else {
                        // set value number
                        if (_temp < _array_min) {
                            _array_min = _temp;
                        }

                    }

                }
                return _array_min;
            }

            if (arguments.length === 2 && typeof fn === "function") {
                var minVal = 0;
                for (var i2 = 0; i2 < data.length; i2++) {
                    var _temp2 = 0;
                    var item = data[i];
                    var v = fn(item);
                    if (typeof v !== "number") {

                        //  is not a number
                        var _num2 = parseFloat(v);
                        if (isNaN(_num2)) {
                            continue;
                        }
                        _temp2 = _num2;

                    } else {

                        //  is a number
                        _temp2 = v;
                    }

                    if (isOne) {
                        minVal = _temp2;
                        _array_min = item;
                        isOne = false;

                    } else {
                        // set value number
                        if (_temp2 < minVal) {
                            minVal = _temp2;
                            _array_min = item;
                        }

                    }

                }
                return _array_min;

            }

        },

        // filter
        filter: function (data, fn) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("第一个参数必须是个数组，第二是回调函数");
            }
            var _arrs = [];
            if (data.constructor === Array) {

                if (typeof fn !== "function") {
                    return data;
                }
                for (var i = 0; i < data.length; i++) {

                    if (fn(data[i])) {
                        _arrs.push(data[i]);
                    }

                }

            }

            return _arrs;
        },

        // where
        where: function (data, fn) {
            return this.filter(data, fn);
        },

        // data map
        map: function (data, fn) {
            data = data || [];
            var arrs = [];
            if (data.constructor !== Array) {
                throw new Error("第一个参数必须是个数组，第二是回调函数");
            }

            if (data.constructor === Array) {

                if (typeof fn !== "function") {
                    return data;
                }

                for (var i = 0; i < data.length; i++) {

                    arrs[i] = fn(data[i]);

                }

            }

            return arrs;

        },

        //  data first
        first: function (data) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            if (data.length > 0) {
                return data[0];
            } else {
                return null;
            }
        },

        //  data last
        last: function (data) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            if (data.length > 0) {
                return data[data.length - 1];
            } else {
                return null;
            }
        },

        //  data  slice startIndex=index值  endindex=末端位置 默认数组的长度endSize=data.length
        slice: function (data, startIndex, endindex) {
            data = data || [];

            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            if (data.length > 0) {
                startIndex = typeof startIndex === "number" ? startIndex : 0;
                endindex = typeof endindex === "number" ? endindex : data.length;
                endindex = endindex > data.length ? data.length : endindex;
                var _arrs = [];
                for (var i = startIndex; i < data.length; i++) {

                    if (i < endindex) {
                        _arrs.push(data[i]);
                    } else {
                        break;
                    }

                }

                return _arrs;

            } else {
                return [];
            }
        },

        forEach: function (data, fn) {

            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            for (var i = 0, len = data.length; i < len; i++) {
                if (typeof fn === "function") {
                    fn(data[i]);
                }
            }

        },


        //  sum
        sum: function (data, fn) {
            data = data || [];

            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }

            if (typeof fn !== "function") {
                return 0;
            }

            var _sum = 0;
            if (data.length > 0) {

                for (var i = 0; i < data.length; i++) {

                    var _num = Number(fn(data[i]));
                    _num = isNaN(_num) ? 0 : _num;
                    _sum = _sum + _num;

                }

                return _sum;

            } else {
                return 0;
            }

        },

        //  avg
        avg: function (data, fn) {
            data = data || [];

            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            var _sum = 0;
            if (data.length > 0) {

                for (var i = 0; i < data.length; i++) {

                    var _num = Number(fn(data[i]));
                    _num = isNaN(_num) ? 0 : _num;
                    _sum = _sum + _num;

                }

                return _sum / data.length;

            } else {
                return 0;
            }
        },


        /*
         *  not repeat  去重复 数组每项是>值类型
         */ // notRepeat
        notRepeat: function (data) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }

            if (data.length <= 0) {
                return [];
            }
            var temp = [];
            temp.push(data[0]);
            for (var i = 1; i < data.length; i++) {

                var test = data[i];
                var isOk = true;
                for (var y = 0; y < temp.length; y++) {

                    var test2 = temp[y];
                    if (test === test2) {

                        isOk = false;
                        break;
                    }

                }

                if (isOk) {
                    temp.push(test);
                }

            }

            return temp;

        },

        /*  
         *  not repeat 去重复 数组每项是>对象类型 fn(a,b){ return a.name===b.name;}
         */
        notRepeatByObject: function (data, fn) {

            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }

            if (data.length <= 0) {
                return [];
            }
            var temp = [];
            temp.push(data[0]);
            for (var i = 1; i < data.length; i++) {

                var test = data[i];
                if (!test instanceof Object) {
                    continue;
                }
                var isOk = true;
                for (var y = 0; y < temp.length; y++) {

                    var test2 = temp[y];
                    if (fn(test, test2)) {

                        isOk = false;
                        break;
                    }

                }

                if (isOk) {
                    temp.push(test);
                }

            }

            return temp;

        },


        /*
         *  分组 fn(a,b){ return a.name===b.name;}
         */
        groupby: function (data, fn) {

            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }

            var list = this.notRepeatByObject(data, fn);
            var res = [];
            for (var i = 0; i < list.length; i++) {
                var temp = [];
                var test = list[i];
                if (!test instanceof Object) {
                    continue;
                }

                for (var y = 0; y < data.length; y++) {

                    var test2 = data[y];
                    if (fn(test, test2)) {
                        temp.push(test2);

                    }

                }

                if (temp.length > 0) {
                    res.push(temp);
                }

            }

            return res;

        },

        // findIndex
        findIndex: function (data, fn) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }

            if (data.length <= 0) {
                return -1;
            }

            if (typeof fn === "function") {
                for (var i = 0; i < data.length; i++) {
                    if (fn(data[i])) {
                        return i;
                    }
                }
            }
            return -1;

        },

        // some return boolead
        some: function (data, fn) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("第一个参数必须是个数组，第二是回调函数");
            }
            var bl = false;
            if (data.constructor === Array) {

                if (typeof fn !== "function") {
                    return data;
                }
                for (var i = 0; i < data.length; i++) {

                    if (fn(data[i])) {
                        bl = true;
                        break;

                    }

                }

            }

            return bl;

        },

        // every return boolead
        every: function (data, fn) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("第一个参数必须是个数组，第二是回调函数");
            }
            var bl = true;
            if (data.constructor === Array) {

                if (typeof fn !== "function") {
                    return data;
                }
                for (var i = 0; i < data.length; i++) {

                    if (!fn(data[i])) {
                        bl = false;
                        break;

                    }

                }

            }

            return bl;

        },

    };

    var _deHtml = function (txt) {
        txt = txt.replace(/&lt;/img, "<").replace(/&gt;/img, ">").replace(/&nbsp;/img, " "); 
        return txt;

    }; // 把文本转换成html

    var _enHtml = function (txt) {
        txt = txt.replace(/</img, "&lt;").replace(/>/img, "&gt;").replace(/\s+/img, "&nbsp;");
        return txt;

    }; // 把转html换成文本

    // 检查是否为移动端
    window.isMobile=function () {

        var userAgentInfo = navigator.userAgent.toString().toLowerCase();
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        //console.log(userAgentInfo)
        var flag = false;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v].toLowerCase()) > 0) {
                flag = true;
                break;
            }
        }
        return flag;
    };


    
    // 兼容IE8+

    window.utils={
        urlPath: _urlPath,
        cookie: _cookie,
        localStorage: _localStorage,
        sessionStorage:_sessionStorage,
        extend: _extend,
        extendDeep: _extendDeep,
        isFunction: _isFunction,
        isArray: _isArray,
        isEmptyObject: _isEmptyObject,
        trim: _trim,
        list: _list,
        date: _date,
        deHtml: _deHtml,
        enHtml: _enHtml,
       
    };

})();