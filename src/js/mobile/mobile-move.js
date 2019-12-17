/*
    hqs-move

    支持多指触摸 touchstart touchmove touchend  合并封装
    $(el).move(touchstart=function(event,obj){},touchmove=function(event,obj){},touchend=function(event,obj){});

    // event 是事件对象
    // obj 是touch 移动对象
        obj = {
        x: 0,       // 手指移动的X坐标的值
        y: 0,       // 手指移动的Y坐标的值
        elX: 0,     // 元素移动的X坐标的值
        elY: 0,     // 元素移动的Y坐标的值
        isX: false, // 是否为X方向移动
        isY: false  // 是否为Y方向移动
        };

*/

+ function (Mobile) {

    Mobile.extend({

        move: function (startfn, movefn, endfn, bl) {

            Mobile.each(this, function () {

                bl = !!bl;
                var isAddMoveEventFirst = true; // 判断是否第一次拖动
                var startX = 0;
                var startY = 0;
                var guid = this;

                var obj = {
                    x: 0, // 手指移动的X坐标的值
                    y: 0, // 手指移动的Y坐标的值
                    elX: 0, // 元素移动的X坐标的值
                    elY: 0, // 元素移动的Y坐标的值
                    isX: false, // 是否为X方向移动
                    isY: false // 是否为Y方向移动

                };

                /* 变化touchList的identifier和时间戳的集合
                    {
                        id,
                        timestamp
                    }
                */
                var tempObj = [];
                m(this).touchstart(function (event) {
                    try {

                        var touches = event.targetTouches;
                        var len = touches.length;
                        Object.keys(touches).forEach(function (name) {

                            if (!tempObj.some(item => touches[name].identifier === item.id)) {
                                tempObj.push({
                                    id: touches[name].identifier,
                                    timestamp: new Date().getTime(),
                                    guid
                                });
                            }
                        });

                        var _index = 0;
                        tempObj = tempObj.filter(function (item) {
                            return item.guid === guid;
                        });
                        var maxCh = m.max(tempObj, function (item) {
                            return item.timestamp;
                        });
                        if (maxCh) {

                            var i = 0;
                            Object.keys(touches).forEach(function (name) {
                                var ch = touches[name];
                                if (ch.identifier === maxCh.id) {
                                    _index = i;
                                }
                                i++;

                            });

                        } else {
                            _index = len - 1;

                        }

                        var touch = touches[_index];
                        obj.x = startX = touch.clientX;
                        obj.y = startY = touch.clientY;

                        if (typeof startfn === "function") {
                            //event.obj=obj;
                            startfn.call(this, event, obj);
                        }

                        // 异常处理
                    } catch (e) {

                        //TODO handle the exception
                        tempObj = [];
                        isAddMoveEventFirst = true; // 判断是否第一次拖动
                        if (typeof endfn === "function") {
                            //event.obj=obj;
                            endfn.call(this, event, obj);
                        }
                    }

                }, bl);


                m(this).touchmove(function (event) {

                    try {

                        var touches = event.touches;
                        var len = touches.length;
                        var _index = 0;
                        tempObj = tempObj.filter(function (item) {
                            return item.guid === guid;
                        });
                        var maxCh = m.max(tempObj, function (item) {
                            return item.timestamp;
                        });
                        if (maxCh) {
                            var i = 0;
                            Object.keys(touches).forEach(function (name) {
                                var ch = touches[name];
                                if (ch.identifier === maxCh.id) {
                                    _index = i;
                                }

                                i++;
                            });

                        } else {
                            _index = len - 1;
                        }

                        var touch = touches[_index];
                        var nowX = touch.clientX;
                        var nowY = touch.clientY;

                        var _x = Math.abs(nowX - startX);
                        var _y = Math.abs(nowY - startY);
                        obj.x = nowX - startX;
                        obj.y = nowY - startY;

                        // 检查是否向上下或左右移动
                        if (isAddMoveEventFirst && (_x !== _y)) {
                            isAddMoveEventFirst = false;
                            if (_y > _x) {

                                obj.isY = true;
                                obj.isX = false;
                            } else {

                                obj.isY = false;
                                obj.isX = true;
                            }
                        }

                        if (typeof movefn === "function") {
                            //event.obj=obj;
                            movefn.call(this, event, obj);
                        }

                        // 异常处理
                    } catch (e) {
                        //TODO handle the exception
                        tempObj = [];
                        isAddMoveEventFirst = true; // 判断是否第一次拖动
                        if (typeof endfn === "function") {
                            //event.obj=obj;
                            endfn.call(this, event, obj);
                        }
                    }

                }, bl);

                m(this).touchendcancel(function (event) {
                    try {

                        var touches = event.changedTouches;
                        var touches2 = event.touches;

                        tempObj = tempObj.filter(function (item) {
                            return item.guid === guid
                        });
                        tempObj = tempObj.filter(function (item) {
                            return item.id !== touches[0].identifier;
                        });
                        var _index = 0;
                        var maxCh = m.max(tempObj, item => item.timestamp);
                        if (maxCh) {
                            var i = 0;
                            Object.keys(touches2).forEach(name => {
                                var ch = touches2[name];
                                if (ch.identifier === maxCh.id) {
                                    _index = i;
                                }
                                i++;

                            });
                        } else {
                            _index = touches2.length - 1;
                        }

                        if (touches2.length > 0) {
                            var touch = touches2[_index];
                            startX = touch.clientX - obj.x;
                            startY = touch.clientY - obj.y;
                        }

                        if (tempObj.length === 0) {
                            tempObj = [];
                            isAddMoveEventFirst = true; // 判断是否第一次拖动
                            if (typeof endfn === "function") {
                                //event.obj=obj;
                                endfn.call(this, event, obj);
                            }
                        }

                        // 异常处理
                    } catch (e) {
                        //TODO handle the exception
                        tempObj = [];
                        isAddMoveEventFirst = true; // 判断是否第一次拖动
                        if (typeof endfn === "function") {
                            //event.obj=obj;
                            endfn.call(this, event, obj);
                        }
                    }

                }, bl);

            });

        },

    });



}(Mobile);