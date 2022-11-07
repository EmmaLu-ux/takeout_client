"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ajax;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* ajax请求函数模块
返回值：promise对象
*/
function ajax(url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
  return new Promise(function (resolve, reject) {
    var promise;

    if (type === 'GET') {
      // 准备url query 参数数据
      var dataStr = ''; //数据拼接字符串

      Object.keys(data).forEach(function (key) {
        dataStr += key + '=' + data[key] + '&';
      });

      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }

      _axios["default"].get(url);
    } else {
      // 发送post 请求
      promise = _axios["default"].post(url, data);
    }

    promise.then(function (resolve) {
      resolve(response.data);
    })["catch"](function (error) {
      reject(error);
    });
  });
}