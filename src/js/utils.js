
// utils.js

(function () {

// url
var urlpath = {
    //采用正则表达式获取地址栏参数：（ 强烈推荐，既实用又方便！）
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r !== null) return decodeURIComponent(r[2]);
        return null;
    },

    //从WebAPI获取日期json数据 转换成日期时间戳
    jsonToDate: function (apidate) {
        var txts = apidate.replace("/Date(", "").replace(")/", "");
        return parseInt(Common.trim(txts));

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

// cookie
var  cookie = {

    setCookie: function (cookieName, cookieValue, expiresDate) {
        cookieName = cookieName || "";
        if (cookieName === "") {
            return;
        }
        cookieValue = cookieValue || "";
        var dt = new Date();
        expiresDate = typeof expiresDate === "number" ? expiresDate : 0;
        dt.setDate(dt.getDate() + expiresDate);
        var expires = dt;
        document.cookie = encodeURIComponent(Common.trim(cookieName)) + "=" + encodeURIComponent(cookieValue) + ";expires=" + expires;

    },

    getCookie: function (cookieName) {

        cookieName = cookieName || "";
        if (cookieName === "") {
            return;
        }

        var cookies = Common.cookie.getAllCookie();

        return cookies[cookieName];

    },

    getAllCookie: function () {

        var strs = document.cookie.split(new RegExp(";\\s*"));
        var obj = {};
        for (var i = 0; i < strs.length; i++) {

            var strs2 = strs[i].split("=");
            try {
                var _name = decodeURIComponent(strs2[0]);
                var _val = decodeURIComponent(strs2[1]);
                obj[_name] = _val;
            } catch (ex) {
                console.log(ex);
            }

        }

        return obj;
    },

    removeCookie: function (cookieName) {

        Common.cookie.setCookie(cookieName, "", -1);

    }

};

// localStorage
var localStorage = {

    // localStorage存值永久有效
    setItem: function (item, value) {
        item = item || "";
        if (typeof item !== "string") {
            return;
        }
        if (Common.trim(item) === "") {
            return;
        }

        localStorage.setItem(Common.trim(item), JSON.stringify(value));
    },

    // localStorage取值
    getItem: function (item) {
        item = item || "";
        if (typeof item !== "string") {
            return;
        }
        if (Common.trim(item) === "") {
            return;
        }
        var data = JSON.parse(localStorage.getItem(Common.trim(item)));
        return data;
    },

    //localStorage删除指定键对应的值
    removeItem: function (item) {
        item = item || "";
        if (typeof item !== "string") {
            return;
        }
        if (Common.trim(item) === "") {
            return;
        }
        localStorage.removeItem(Common.trim(item));

    },
    clear: function () {
        localStorage.clear();
    }

};

// sessionStorage
var  sessionStorage = {

    // sessionStorage 
    setItem: function (item, value) {
        item = item || "";
        if (typeof item !== "string") {
            return;
        }
        if (Common.trim(item) === "") {
            return;
        }

        sessionStorage.setItem(Common.trim(item), JSON.stringify(value));
    },

    // sessionStorage 取值
    getItem: function (item) {
        item = item || "";
        if (typeof item !== "string") {
            return;
        }
        if (Common.trim(item) === "") {
            return;
        }
        var data = JSON.parse(sessionStorage.getItem(Common.trim(item)));
        return data;
    },

    // sessionStorage 删除指定键对应的值
    removeItem: function (item) {
        item = item || "";
        if (typeof item !== "string") {
            return;
        }
        if (Common.trim(item) === "") {
            return;
        }
        sessionStorage.removeItem(Common.trim(item));

    },

    clear: function () {
        sessionStorage.clear();
    }

    };

// 浅复制 parentObj 父元素 childObj子元素
var extend = function (parentObj, childObj) {

    childObj = childObj || {};

    for (var prop in parentObj) {
        childObj[prop] = parentObj[prop];
    }
    return childObj;
};

// 深复制 parentObj 父元素 childObj子元素
var extendDeep = function (parentObj, childObj) {

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
var isFunction = function (obj) {

    return typeof obj === "function";

 };

// 是否是数组
var isArray = function (obj) {

    return obj.constructor === Array;

    };

// 是否是空对象
var isEmptyObject = function (obj) {

    for (var prop in obj) {
        return false;
    }

    return true;

    };

// 去掉首尾空字符串
var trim = function (txt) {
    var str = "";
    str = txt.toString().replace(/^\s*|\s*$/img, "");
    return str;
};

 var date = {

            // 根据年和月获取天数
            getDayCount: function(y, m) {
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

            // 计算天数的函数数组列表 《用于当前项目 -比价网》
            getDateArray: function (o, list) {

                var temp = [];
                for (var i = 0; i < list.length; i++) {
                    var bl = false;
                    var v;
                    for (name in o) {
                        if (list[i] === name) {
                            v = parseFloat(o[name]);
                            bl = true;
                        }
                    }

                    if (bl) {
                        temp.push({ name: list[i], v: v });
                    } 
                }

                return temp;

     },

            //把字符串转换成时间  《用于当前项目 -比价网》
            dataObjToObjcetChart: function (list) {

              list = list || [];
                var arr = [];
                for (var i = 0; i < list.length; i++) {
                    var item = list[i];
                    if (item) {
                        var dts = item.name.split("-");
                        var y = Number(dts[0]), m = Number(dts[1])-1, d = Number(dts[2]);
                        timestamp = Date.UTC(y, m, d);
                        arr.push([timestamp, item.v]);
                    }
                }
                return arr;
            }

      };

// 数组列表
 var list = {

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
        where: function (data,fn) {
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

        //  data  slice startIndex=index值  endSize=获取个数 默认数组的长度endSize=data.length
        slice: function (data, startIndex, endSize) {
            data = data || [];

            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            if (data.length > 0) {
                startIndex = typeof startIndex === "number" ? startIndex : 0;
                endSize = typeof endSize === "number" ? endSize : data.length;
                endSize = (startIndex + endSize) > data.length ? data.length : (startIndex + endSize);
                var _arrs = [];
                for (var i = startIndex; i < data.length; i++) {

                    if (i < endSize) {
                        _arrs.push(data[i]);
                    } else { break; } 
                       
                }

                return _arrs;

            } else {
                return [];
            }
        },

      
        //  sum
        sum: function (data,fn) {
            data = data || [];

            if (data.constructor !== Array) {
                throw new Error("参数必须是个数组");
            }
            
            if (typeof fn !== "function") { return 0; }

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
        avg: function (data,fn) {
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
                if (!test instanceof Object) { continue; }
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
                if (!test instanceof Object) { continue; }

                for (var y = 0; y < data.length; y++) {

                    var test2 = data[y];
                    if (fn(test, test2)) {
                        temp.push(test2);

                    }

                }

                if (temp.length > 0) { res.push(temp); }

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
        some: function (data,fn) {
            data = data || [];
            if (data.constructor !== Array) {
                throw new Error("第一个参数必须是个数组，第二是回调函数");
            }
            var  bl=false;
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

 var deHtml = function (txt) {
        txt = txt.replace(/&lt;/img, "<").replace(/&gt;/img, ">").replace(/&nbsp/img," ");
        return txt;

    }; // 把文本转换成html

  var enHtml = function (txt) {
      txt = txt.replace(/</img, "&lt;").replace(/>/img, "&gt;").replace(/\s+/img, "&nbsp");
        return txt;

    }; // 把转html换成文本

  
// 兼容IE8+
utils = {

    urlpath: urlpath,
    cookie: cookie,
    localStorage: localStorage,
    sessionStorage: sessionStorage,
    extend: extend,
    extendDeep: extendDeep,
    isFunction: isFunction,
    isArray: isArray,
    isEmptyObject: isEmptyObject,
    trim:trim,
    list: list,
    date: date,
    deHtml: deHtml,
    enHtml:enHtml
};

})();