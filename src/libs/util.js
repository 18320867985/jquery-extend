
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
var cookie = {

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
var sessionStorage = {

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

function toDate(value, fmt) {
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
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
        }
    }
    return fmt;
}

var list = {


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

    // data where
    where: function (data, fn) {
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

                arrs[i] = fn(data[i]) || data[i];

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

    //  data  slice
    slice: function (data, startIndex, endIndex) {
        data = data || [];

        if (data.constructor !== Array) {
            throw new Error("参数必须是个数组");
        }
        if (data.length > 0) {
            startIndex = typeof startIndex === "number" ? startIndex : 0;
            endIndex = typeof endIndex === "number" ? endIndex : 0;
            var _arrs = [];
            for (var i = startIndex; i < data.length; i++) {

                if (i < endIndex) {
                    _arrs.push(data[i]);
                }

            }

            return _arrs;

        } else {
            return [];
        }
    },

    //  sort
    sort: function (data, fn) {
        data = data || [];

        if (data.constructor !== Array) {
            throw new Error("参数必须是个数组");
        }
        if (data.length > 0) {

            Array.prototype.sort.call(data, fn);

            return data;

        } else {
            return [];
        }
    },

    //  reverse
    reverse: function (data) {
        data = data || [];

        if (data.constructor !== Array) {
            throw new Error("参数必须是个数组");
        }
        if (data.length > 0) {

            Array.prototype.reverse.call(data);

            return data;

        } else {
            return [];
        }
    },

    //  sum
    sum: function (data) {
        data = data || [];

        if (data.constructor !== Array) {
            throw new Error("参数必须是个数组");
        }
        var _sum = 0;
        if (data.length > 0) {

            for (var i = 0; i < data.length; i++) {

                var _num = Number(data[i]);
                _num = isNaN(_num) ? 0 : _num;
                _sum = _sum + _num;

            }

            return _sum;

        } else {
            return 0;
        }
    },

    //  avg
    avg: function (data) {
        data = data || [];

        if (data.constructor !== Array) {
            throw new Error("参数必须是个数组");
        }
        var _sum = 0;
        if (data.length > 0) {

            for (var i = 0; i < data.length; i++) {

                var _num = Number(data[i]);
                _num = isNaN(_num) ? 0 : _num;
                _sum = _sum + _num;

            }

            return _sum / data.length;

        } else {
            return 0;
        }
    },

    //  splice
    splice: function (data, startIndex, endIndex) {
        data = data || [];

        if (data.constructor !== Array) {
            throw new Error("参数必须是个数组");
        }
        var _sum = 0;
        if (data.length > 0) {

            Array.prototype.splice.call(data, startIndex, endIndex);

            return data;

        } else {
            return [];
        }
    },


    /*
     *  not repeat  去重复 数组每项是>值类型
     */
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
     *  not repeat 去重复 数组每项是>对象类型
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
                    temp.push(test);

                }

            }

            if (temp.length > 0) { res.push(temp); }

        }

        return res;

    },

    // index
    index: function (data, fn) {
        data = data || [];
        if (data.constructor !== Array) {
            throw new Error("参数必须是个数组");
        }

        if (data.length <= 0) {
            return [];
        }

        if (typeof fn === "function") {
            for (var i = 0; i < data.length; i++) {
                if (fn(data[i])) {
                    return i;
                }
            }
        }
        return -1;

    }

};


export default {
  
    urlpath,
    cookie,
    localStorage,
    sessionStorage,
    list

};