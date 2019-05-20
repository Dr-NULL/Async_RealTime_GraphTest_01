"use strict";
//Objeto Ajax
var Ajax = /** @class */ (function () {
    function Ajax(type, url) {
        var _this = this;
        this._type = type;
        this._url = url;
        this._core = new XMLHttpRequest();
        this._core.onreadystatechange = function () {
            if ((_this._core.readyState == 4) && (_this._core.status == 200)) {
                if (_this._onSuccess != null) {
                    _this._onSuccess(JSON.parse(_this._core.response));
                }
            }
            else {
                if (_this._onError != null) {
                    _this._onError(null);
                }
            }
        };
    }
    Object.defineProperty(Ajax.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ajax.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ajax.prototype, "onSuccess", {
        get: function () {
            return this._onSuccess;
        },
        set: function (value) {
            this._onSuccess = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ajax.prototype, "onError", {
        get: function () {
            return this._onError;
        },
        set: function (value) {
            this._onError = value;
        },
        enumerable: true,
        configurable: true
    });
    Ajax.prototype.send = function (req) {
        this._core.open(this._type, this._url, true);
        this._core.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this._core.setRequestHeader("Access-Control-Allow-Origin", "*");
        this._core.send(JSON.stringify(req));
    };
    return Ajax;
}());
