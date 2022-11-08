"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqShops = exports.reqFoodCategorys = exports.reqAddress = void 0;

var _ajax = _interopRequireDefault(require("./ajax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* 包含多个接口请求函数的模块 */
// 根据经纬度获取位置详情
var reqAddress = function reqAddress(geohash) {
  return (0, _ajax["default"])("/position/".concat(geohash));
}; // 获取食品分类列表


exports.reqAddress = reqAddress;

var reqFoodCategorys = function reqFoodCategorys() {
  return (0, _ajax["default"])('/index_category');
}; // 根据经纬度获取商铺列表


exports.reqFoodCategorys = reqFoodCategorys;

var reqShops = function reqShops(longitude, latitude) {
  return (0, _ajax["default"])('/shops', {
    longitude: longitude,
    latitude: latitude
  });
}; // 根据经纬度和关键字搜索商铺列表
// 获取一次性验证码
// 用户名密码登陆
// 发送短信验证码
// 手机号验证码登陆


exports.reqShops = reqShops;